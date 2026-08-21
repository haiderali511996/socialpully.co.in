from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
from django.http import FileResponse, Http404
from django.conf import settings
import yt_dlp
import os
import time
import shutil
import subprocess
import functools
from django.http import StreamingHttpResponse
from django.core.cache import cache
import requests
from .models import VideoDownload
from .serializers import (
    VideoDownloadSerializer,
    VideoInfoSerializer,
    DownloadRequestSerializer,
    AudioDownloadSerializer
)

TIKTOK_HTTP_HEADERS = {
    "User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36",
    "Referer": "https://www.tiktok.com/",
    "Accept-Language": "en-US,en;q=0.9",
}


def absolute_url(request, path: str) -> str:
    return request.build_absolute_uri(path)


def cookie_opts() -> dict:
    """yt-dlp cookiefile kwarg, only when the configured file actually exists.

    Lets an operator drop in browser-exported cookies (settings.YTDLP_COOKIES_FILE)
    to authenticate with sites that reject anonymous requests, without changing
    behavior at all when no such file is present.
    """
    path = getattr(settings, 'YTDLP_COOKIES_FILE', None)
    if path and os.path.exists(path):
        return {'cookiefile': path}
    return {}


@functools.lru_cache(maxsize=1)
def _impersonate_target():
    """Resolve settings.YTDLP_IMPERSONATE_TARGET to a usable ImpersonateTarget,
    or None if impersonation is disabled, misconfigured, or the curl_cffi
    dependency isn't installed. Computed once per process -- probing
    availability constructs a throwaway YoutubeDL instance, too expensive to
    repeat on every request.
    """
    if not getattr(settings, 'YTDLP_ENABLE_IMPERSONATION', False):
        return None
    target_name = getattr(settings, 'YTDLP_IMPERSONATE_TARGET', None)
    if not target_name:
        return None
    try:
        from yt_dlp.networking.impersonate import ImpersonateTarget
        target = ImpersonateTarget.from_str(target_name)
        with yt_dlp.YoutubeDL({'quiet': True}) as probe:
            # Uses a private yt-dlp method since there's no public API for
            # this check; falls back to no impersonation (via the except
            # below) if a future yt-dlp version removes it.
            if not probe._impersonate_target_available(target):
                return None
        return target
    except Exception:
        return None


def impersonate_opts() -> dict:
    """yt-dlp impersonate kwarg -- makes outbound requests carry a real
    browser's TLS/HTTP fingerprint instead of Python's default one, which
    some CDNs use to distinguish genuine playback from scripted downloads.
    A no-op if disabled in settings or curl_cffi isn't installed/compatible.
    """
    target = _impersonate_target()
    return {'impersonate': target} if target else {}


def js_runtime_opts() -> dict:
    """yt-dlp js_runtimes kwarg, pointing at a Deno binary when one exists
    at settings.YTDLP_DENO_PATH. Sites (YouTube especially) increasingly
    require computing a token via JavaScript to authorize actual video
    downloads; without a JS runtime available, requests can succeed for
    metadata but come back empty for the download itself. A no-op -- yt-dlp
    falls back to its own default runtime search -- when no binary is found
    there.
    """
    path = getattr(settings, 'YTDLP_DENO_PATH', None)
    if path and os.path.exists(path):
        return {'js_runtimes': {'deno': {'path': path}}}
    return {}


_YOUTUBE_HOSTS = ('youtube.com', 'youtu.be')


def proxy_opts(url: str) -> dict:
    """yt-dlp proxy kwarg, only for YouTube URLs and only when configured.

    This server's IP is blocked by YouTube specifically (confirmed: the same
    request succeeds from an unrelated machine, with or without cookies) --
    no other platform needs this. Routing every request through a proxy
    would cost bandwidth for no benefit, so this only applies to youtube.com
    / youtu.be links, and only when settings.YTDLP_PROXY_URL is set.
    """
    proxy = getattr(settings, 'YTDLP_PROXY_URL', None)
    if not proxy or not url:
        return {}
    host = url.split('//', 1)[-1].split('/', 1)[0].lower()
    if host.startswith('www.'):
        host = host[4:]
    if host in _YOUTUBE_HOSTS:
        return {'proxy': proxy}
    return {}


# Maps a substring of yt-dlp's raw error text to something a visitor can act
# on. Order matters: the first match wins, so put specific patterns above
# general ones. The raw text is still returned in the response's `details`
# field for debugging -- this only replaces what the UI puts in front of
# people, which otherwise reads as "this site is broken" when in fact the
# platform declined to serve us.
_ERROR_PATTERNS = [
    (('sign in to confirm', 'not a bot', 'confirm you’re not a bot'),
     'This platform is currently blocking automated requests from our server. '
     'This is a restriction on their side, not a problem with your link. '
     'Please try again later.'),
    (('age-restricted', 'age restricted', 'confirm your age', 'inappropriate for some users'),
     'This video is age-restricted and can only be viewed by signing in on the '
     'original platform, so it cannot be downloaded here.'),
    (('rate-limit reached or login required', 'login required', 'requires login',
      'you must be logged in', 'private video', 'this video is private'),
     'This content is private or requires signing in on the original platform, '
     'so it cannot be downloaded.'),
    (('video unavailable', 'has been removed', 'no longer available',
      'account has been terminated', 'this video has been removed'),
     'This video is no longer available. It may have been deleted or made private.'),
    (('not available in your country', 'not available from your location',
      'geo restriction', 'geo-restricted', 'blocked it in your country'),
     'This content is not available in our server’s region.'),
    (('no video could be found', 'there is no video', 'no media found',
      'unable to extract video'),
     'No downloadable video was found at that link. Double-check that the post '
     'actually contains a video.'),
    (('downloaded file is empty',),
     'The platform accepted our request but refused to send the video file. '
     'This usually means it is blocking downloads from our server.'),
    (('requested format is not available',),
     'This video is not available in a downloadable format. Try a different '
     'quality setting.'),
    (('unsupported url', 'no suitable extractor', 'is not a valid url'),
     'That link is not from a supported site, or is not a direct link to a video.'),
    (('http error 429', 'too many requests'),
     'Too many requests have been made recently. Please wait a few minutes and '
     'try again.'),
    (('http error 404',),
     'That link could not be found. Please check the URL and try again.'),
]


def friendly_error(exc, fallback: str) -> str:
    """Translate a yt-dlp exception into something worth showing a visitor.

    Falls back to the caller's generic message when nothing matches, so an
    unrecognised failure still reads sensibly rather than leaking a stack of
    yt-dlp internals into the UI.
    """
    text = str(exc).lower()
    for needles, message in _ERROR_PATTERNS:
        if any(needle in text for needle in needles):
            return message
    return fallback


def is_tiktok_url(url: str) -> bool:
    u = (url or "").lower()
    return "tiktok.com" in u or "vm.tiktok.com" in u or "vt.tiktok.com" in u


def tiktok_stream_format(quality: str) -> str:
    # Streaming requires a single progressive file (video+audio together)
    q = (quality or "best").lower()

    def base(max_h: int | None):
        if max_h:
            return (
                f"best[height<={max_h}][ext=mp4][vcodec!=none][acodec!=none]/"
                f"best[ext=mp4][vcodec!=none][acodec!=none]/best"
            )
        return "best[ext=mp4][vcodec!=none][acodec!=none]/best"

    if q in ("1080p", "1080"):
        return base(1080)
    if q in ("720p", "720"):
        return base(720)
    if q in ("480p", "480"):
        return base(480)
    if q in ("360p", "360"):
        return base(360)
    return base(None)


def pick_progressive_url(info: dict) -> str:
    # Prefer a single mp4 with audio+video
    if info.get("url") and (info.get("ext") == "mp4" or ".mp4" in str(info.get("url"))):
        return info["url"]

    fmts = info.get("formats") or []
    for f in reversed(fmts):
        u = f.get("url")
        if not u:
            continue
        if f.get("ext") == "mp4" and f.get("vcodec") != "none" and f.get("acodec") != "none":
            return u

    # Fallback: any url
    if info.get("url"):
        return info["url"]
    for f in reversed(fmts):
        u = f.get("url")
        if u:
            return u

    raise Exception("No streamable URL found")


def stream_upstream(url: str, headers: dict, chunk_size: int = 1024 * 512):
    r = requests.get(url, headers=headers, stream=True, timeout=45, allow_redirects=True)
    try:
        r.raise_for_status()
        for chunk in r.iter_content(chunk_size=chunk_size):
            if chunk:
                yield chunk
    finally:
        try:
            r.close()
        except Exception:
            pass

def check_ffmpeg():
    """Check if FFmpeg is installed"""
    return shutil.which('ffmpeg') is not None


def get_ffmpeg_location():
    """Get FFmpeg location or return None"""
    # Check common Windows locations first
    common_windows_paths = [
        r"C:\ffmpeg\bin",
        r"C:\Program Files\ffmpeg\bin",
        r"C:\Program Files (x86)\ffmpeg\bin",
    ]
    
    for path in common_windows_paths:
        if os.path.exists(os.path.join(path, 'ffmpeg.exe')):
            return path
    
    # Check system PATH
    ffmpeg_path = shutil.which('ffmpeg')
    if ffmpeg_path:
        return os.path.dirname(ffmpeg_path)
    
    return None


def get_platform_specific_format(url, quality, has_ffmpeg):
    """Get platform-specific format string"""
    url_lower = url.lower()
    
    # Facebook-specific formats
    if 'facebook.com' in url_lower or 'fb.watch' in url_lower or 'fb.com' in url_lower:
        if has_ffmpeg:
            return 'best[ext=mp4]/best'
        else:
            # 'best' alone requires a single format with both audio and video;
            # fall back to video-only (silent) rather than fail outright when
            # a video is only offered as separate streams and there's no
            # FFmpeg available to merge them.
            return 'best/bestvideo'

    # Instagram-specific formats
    elif 'instagram.com' in url_lower:
        return 'best[ext=mp4]/best/bestvideo[ext=mp4]/bestvideo'

    # Twitter/X-specific formats
    elif 'twitter.com' in url_lower or 'x.com' in url_lower:
        if has_ffmpeg:
            quality_map = {
                'best': 'best[ext=mp4]/best',
                '1080p': 'best[height<=1080][ext=mp4]/best[height<=1080]',
                '720p': 'best[height<=720][ext=mp4]/best[height<=720]',
                '480p': 'best[height<=480][ext=mp4]/best[height<=480]',
                '360p': 'best[height<=360][ext=mp4]/best[height<=360]'
            }
        else:
            # Same fallback as above: try a combined format first, then
            # settle for video-only instead of failing.
            quality_map = {
                'best': 'best/bestvideo',
                '1080p': 'best[height<=1080]/bestvideo[height<=1080]',
                '720p': 'best[height<=720]/bestvideo[height<=720]',
                '480p': 'best[height<=480]/bestvideo[height<=480]',
                '360p': 'best[height<=360]/bestvideo[height<=360]'
            }
        return quality_map.get(quality, quality_map['best'])
    
    # YouTube and other sites that support separate video+audio streams
    else:
        if has_ffmpeg:
            quality_map = {
                'best': 'bestvideo[ext=mp4]+bestaudio[ext=m4a]/bestvideo+bestaudio/best[ext=mp4]/best',
                '1080p': 'bestvideo[height<=1080][ext=mp4]+bestaudio[ext=m4a]/bestvideo[height<=1080]+bestaudio/best[height<=1080][ext=mp4]/best[height<=1080]',
                '720p': 'bestvideo[height<=720][ext=mp4]+bestaudio[ext=m4a]/bestvideo[height<=720]+bestaudio/best[height<=720][ext=mp4]/best[height<=720]',
                '480p': 'bestvideo[height<=480][ext=mp4]+bestaudio[ext=m4a]/bestvideo[height<=480]+bestaudio/best[height<=480][ext=mp4]/best[height<=480]',
                '360p': 'bestvideo[height<=360][ext=mp4]+bestaudio[ext=m4a]/bestvideo[height<=360]+bestaudio/best[height<=360][ext=mp4]/best[height<=360]'
            }
        else:
            # Sites like Pinterest only ever deliver video and audio as
            # separate HLS streams — there is no combined format to pick,
            # so 'best[ext=mp4]/best' alone fails outright. Fall back to
            # video-only (silent) rather than error when that happens.
            quality_map = {
                'best': 'best[ext=mp4]/best/bestvideo[ext=mp4]/bestvideo',
                '1080p': 'best[height<=1080][ext=mp4]/best[height<=1080]/bestvideo[height<=1080][ext=mp4]/bestvideo[height<=1080]',
                '720p': 'best[height<=720][ext=mp4]/best[height<=720]/bestvideo[height<=720][ext=mp4]/bestvideo[height<=720]',
                '480p': 'best[height<=480][ext=mp4]/best[height<=480]/bestvideo[height<=480][ext=mp4]/bestvideo[height<=480]',
                '360p': 'best[height<=360][ext=mp4]/best[height<=360]/bestvideo[height<=360][ext=mp4]/bestvideo[height<=360]'
            }
        return quality_map.get(quality, quality_map['best'])


class VideoInfoView(APIView):
    """Get video information without downloading"""
    
    def post(self, request):
        serializer = VideoInfoSerializer(data=request.data)
        if not serializer.is_valid():
            return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
        
        url = serializer.validated_data['url']
        
        ydl_opts = {
            'quiet': True,
            'no_warnings': True,
            'extract_flat': False,
            'nocheckcertificate': True,
        }
        ydl_opts.update(cookie_opts())
        ydl_opts['noplaylist'] = True
        ydl_opts.update(impersonate_opts())
        ydl_opts.update(js_runtime_opts())
        ydl_opts.update(proxy_opts(url))

        try:
            with yt_dlp.YoutubeDL(ydl_opts) as ydl:
                info = ydl.extract_info(url, download=False)

                # Extract available formats
                formats = []
                if 'formats' in info:
                    for f in info['formats']:
                        # Include both combined formats and separate video/audio
                        if f.get('vcodec') != 'none' or f.get('acodec') != 'none':
                            formats.append({
                                'format_id': f.get('format_id'),
                                'quality': f.get('format_note', f.get('quality', 'unknown')),
                                'ext': f.get('ext'),
                                'filesize': f.get('filesize'),
                                'resolution': f.get('resolution'),
                                'fps': f.get('fps'),
                                'has_video': f.get('vcodec') != 'none',
                                'has_audio': f.get('acodec') != 'none',
                            })
                
                video_info = {
                    'success': True,
                    'id': info.get('id'),
                    'title': info.get('title'),
                    'thumbnail': info.get('thumbnail'),
                    'duration': info.get('duration'),
                    'uploader': info.get('uploader') or info.get('channel'),
                    'upload_date': info.get('upload_date'),
                    'view_count': info.get('view_count'),
                    'description': info.get('description', '')[:500],
                    'platform': info.get('extractor_key'),
                    'webpage_url': info.get('webpage_url'),
                    'formats': formats[:20],
                    'ffmpeg_available': check_ffmpeg(),
                }
                
                return Response(video_info, status=status.HTTP_200_OK)
                
        except Exception as e:
            return Response({
                'success': False,
                'error': friendly_error(e, 'Failed to fetch video information'),
                'details': str(e)
            }, status=status.HTTP_500_INTERNAL_SERVER_ERROR)

class TikTokStreamView(APIView):
    """
    Streams TikTok via our server (no disk write).
    URL: /api/tiktok-stream/<int:pk>/
    """

    def get(self, request, pk: int):
        try:
            video_download = VideoDownload.objects.get(pk=pk)
        except VideoDownload.DoesNotExist:
            raise Http404("Download record not found")

        cache_key = f"tiktok:direct:{pk}"
        direct_url = cache.get(cache_key)

        # If expired, re-extract (best-effort)
        if not direct_url:
            ydl_opts = {
                "format": tiktok_stream_format(video_download.quality or "best"),
                "quiet": True,
                "no_warnings": True,
                "nocheckcertificate": True,
                "http_headers": TIKTOK_HTTP_HEADERS,
            }
            ydl_opts.update(cookie_opts())
            ydl_opts['noplaylist'] = True
            ydl_opts.update(impersonate_opts())
            ydl_opts.update(js_runtime_opts())
            ydl_opts.update(proxy_opts(video_download.url))
            try:
                with yt_dlp.YoutubeDL(ydl_opts) as ydl:
                    info = ydl.extract_info(video_download.url, download=False)
                    direct_url = pick_progressive_url(info)
            except Exception as e:
                return Response({
                    'success': False,
                    'error': friendly_error(e, 'Stream link expired and could not be refreshed'),
                    'details': str(e),
                }, status=status.HTTP_502_BAD_GATEWAY)

            cache.set(cache_key, direct_url, 1800)

        resp = StreamingHttpResponse(
            stream_upstream(direct_url, TIKTOK_HTTP_HEADERS), content_type="video/mp4"
        )
        resp["Access-Control-Allow-Origin"] = "*"
        return resp

class DownloadVideoView(APIView):
    """Download video to server"""
    
    def post(self, request):
        serializer = DownloadRequestSerializer(data=request.data)
        if not serializer.is_valid():
            return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
        
        url = serializer.validated_data['url']
        quality = serializer.validated_data['quality']
        video_format = serializer.validated_data['format']
        
        # Check FFmpeg availability
        has_ffmpeg = check_ffmpeg()
        ffmpeg_location = get_ffmpeg_location()
        
        # Create media directory if it doesn't exist
        media_path = os.path.join(settings.MEDIA_ROOT, 'downloads')
        os.makedirs(media_path, exist_ok=True)
        
        # Generate unique filename
        timestamp = int(time.time())
        output_template = os.path.join(media_path, f'video_{timestamp}.%(ext)s')
        
        # Get platform-specific format string
        format_string = get_platform_specific_format(url, quality, has_ffmpeg)
        
        ydl_opts = {
            'format': format_string,
            'outtmpl': output_template,
            'quiet': True,
            'no_warnings': True,
            'nocheckcertificate': True,
            'ignoreerrors': False,
        }
        ydl_opts.update(cookie_opts())
        ydl_opts['noplaylist'] = True
        ydl_opts.update(impersonate_opts())
        ydl_opts.update(js_runtime_opts())
        ydl_opts.update(proxy_opts(url))

        # Add FFmpeg location and merge format if available
        if has_ffmpeg:
            ydl_opts['merge_output_format'] = video_format
            if ffmpeg_location:
                ydl_opts['ffmpeg_location'] = ffmpeg_location
                print(f"Using FFmpeg from: {ffmpeg_location}")

        try:
            with yt_dlp.YoutubeDL(ydl_opts) as ydl:
                # Get info first
                info = ydl.extract_info(url, download=False)
                
                # Create database record
                video_download = VideoDownload.objects.create(
                    url=url,
                    title=info.get('title', ''),
                    platform=info.get('extractor_key', ''),
                    thumbnail=info.get('thumbnail', ''),
                    duration=info.get('duration'),
                    quality=quality,
                    status='downloading'
                )
                
                # Download video
                ydl.download([url])
                
                # Find downloaded file
                downloaded_files = [f for f in os.listdir(media_path) 
                                  if f.startswith(f'video_{timestamp}')]
                
                if not downloaded_files:
                    video_download.status = 'failed'
                    video_download.save()
                    raise Exception('Downloaded file not found')
                
                filename = downloaded_files[0]
                file_path = os.path.join(media_path, filename)
                file_size = os.path.getsize(file_path)
                
                # Update database record
                video_download.file_path = f'downloads/{filename}'
                video_download.file_size = file_size
                video_download.status = 'completed'
                video_download.save()
                
                response_data = {
                    'success': True,
                    'message': 'Video downloaded successfully',
                    'id': video_download.id,
                    'filename': filename,
                    'size': file_size,
                    'download_url': f'/api/file/{video_download.id}/',
                    'title': video_download.title,
                    'platform': video_download.platform,
                }
                
                # Add warning if FFmpeg is not available
                if not has_ffmpeg:
                    if info.get('acodec') in (None, 'none'):
                        response_data['warning'] = (
                            'This video has no audio track. The site only provides video and audio '
                            'as separate streams, and merging them requires FFmpeg, which is not '
                            'installed on this server.'
                        )
                    else:
                        response_data['warning'] = 'FFmpeg not installed. Video quality may be limited to pre-merged formats.'
                
                return Response(response_data, status=status.HTTP_200_OK)
                
        except Exception as e:
            error_message = str(e)
            
            # Update database record if it exists
            try:
                if 'video_download' in locals():
                    video_download.status = 'failed'
                    video_download.save()
            except:
                pass
            
            # Provide helpful error message if FFmpeg is missing
            if 'ffmpeg' in error_message.lower() or 'merging' in error_message.lower():
                return Response({
                    'success': False,
                    'error': 'FFmpeg is required for high-quality downloads',
                    'details': error_message,
                    'solution': 'Please install FFmpeg',
                    'installation_guide': {
                        'Windows': [
                            '1. Download FFmpeg from https://ffmpeg.org/download.html',
                            '2. Extract to C:\\ffmpeg\\',
                            '3. Add C:\\ffmpeg\\bin to System PATH',
                            '4. Restart the Django server'
                        ],
                        'Ubuntu/Debian': 'sudo apt-get install ffmpeg',
                        'MacOS': 'brew install ffmpeg',
                    },
                    'ffmpeg_detected': has_ffmpeg,
                    'ffmpeg_location': ffmpeg_location,
                }, status=status.HTTP_424_FAILED_DEPENDENCY)
            
            # Handle format not available error
            if 'Requested format is not available' in error_message:
                return Response({
                    'success': False,
                    'error': 'Requested format is not available',
                    'details': error_message,
                    'solution': 'Try downloading with "best" quality or check if the video is available',
                    'suggestion': 'The video platform may not support the requested quality level'
                }, status=status.HTTP_400_BAD_REQUEST)
            
            return Response({
                'success': False,
                'error': friendly_error(e, 'Failed to download video'),
                'details': error_message
            }, status=status.HTTP_500_INTERNAL_SERVER_ERROR)


class DirectURLView(APIView):
    """Get direct download URL without downloading to server"""
    
    def post(self, request):
        serializer = DownloadRequestSerializer(data=request.data)
        if not serializer.is_valid():
            return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
        
        url = serializer.validated_data['url']
        quality = serializer.validated_data['quality']
        
        # Use simple format selection (no merging needed for direct URLs).
        # Falls back to video-only when a site (e.g. Pinterest) only ever
        # offers separate video/audio streams, rather than erroring out.
        quality_options = {
            'best': 'best/bestvideo',
            '1080p': 'best[height<=1080]/bestvideo[height<=1080]',
            '720p': 'best[height<=720]/bestvideo[height<=720]',
            '480p': 'best[height<=480]/bestvideo[height<=480]',
            '360p': 'best[height<=360]/bestvideo[height<=360]'
        }
        
        ydl_opts = {
            'format': quality_options.get(quality, quality_options['best']),
            'quiet': True,
            'no_warnings': True,
            'nocheckcertificate': True,
        }
        ydl_opts.update(cookie_opts())
        ydl_opts['noplaylist'] = True
        ydl_opts.update(impersonate_opts())
        ydl_opts.update(js_runtime_opts())
        ydl_opts.update(proxy_opts(url))

        try:
            with yt_dlp.YoutubeDL(ydl_opts) as ydl:
                info = ydl.extract_info(url, download=False)

                # Get the direct URL
                if 'url' in info:
                    direct_url = info['url']
                elif 'formats' in info and info['formats']:
                    # Get the best format URL
                    direct_url = info['formats'][-1].get('url')
                else:
                    direct_url = info.get('webpage_url')
                
                return Response({
                    'success': True,
                    'direct_url': direct_url,
                    'title': info.get('title'),
                    'thumbnail': info.get('thumbnail'),
                    'duration': info.get('duration'),
                }, status=status.HTTP_200_OK)
                
        except Exception as e:
            return Response({
                'success': False,
                'error': friendly_error(e, 'Failed to get direct URL'),
                'details': str(e)
            }, status=status.HTTP_500_INTERNAL_SERVER_ERROR)


class DownloadAudioView(APIView):
    """Download audio only"""
    
    def post(self, request):
        serializer = AudioDownloadSerializer(data=request.data)
        if not serializer.is_valid():
            return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

        url = serializer.validated_data['url']
        audio_format = serializer.validated_data['format']
        # Optional: callers may pass a preferred resolution for the TikTok
        # stream flow below. Absent (the common case) it falls back to "best".
        quality = request.data.get('resolution') or request.data.get('quality') or 'best'

        # TikTok: stream-proxy flow (no disk write). Keep other platforms unchanged.
        if is_tiktok_url(url):
            ydl_opts = {
                "format": tiktok_stream_format(quality),
                "quiet": True,
                "no_warnings": True,
                "nocheckcertificate": True,
                "http_headers": TIKTOK_HTTP_HEADERS,
            }
            ydl_opts.update(cookie_opts())
            ydl_opts['noplaylist'] = True
            ydl_opts.update(impersonate_opts())
            ydl_opts.update(js_runtime_opts())
            ydl_opts.update(proxy_opts(url))

            try:
                with yt_dlp.YoutubeDL(ydl_opts) as ydl:
                    info = ydl.extract_info(url, download=False)
                    direct_url = pick_progressive_url(info)
            except Exception as e:
                return Response({
                    'success': False,
                    'error': friendly_error(e, 'Failed to fetch TikTok video'),
                    'details': str(e),
                }, status=status.HTTP_502_BAD_GATEWAY)

            # Create DB record (no file_path) so your history still works
            video_download = VideoDownload.objects.create(
                url=url,
                title=info.get("title", ""),
                platform=info.get("extractor_key", "tiktok"),
                thumbnail=info.get("thumbnail", ""),
                duration=info.get("duration"),
                quality=quality,
                status="completed",
                file_path="",
                file_size=0,
            )

            # Cache the direct url for the stream endpoint
            cache.set(f"tiktok:direct:{video_download.id}", direct_url, 1800)

            stream_path = f"/api/tiktok-stream/{video_download.id}/"
            return Response(
                {
                    "success": True,
                    "message": "TikTok video ready to stream",
                    "id": video_download.id,
                    "title": video_download.title,
                    "platform": video_download.platform,
                    "thumbnail": video_download.thumbnail,
                    "duration": video_download.duration,
                    "mode": "stream",
                    "download_url": absolute_url(request, stream_path),
                    "direct_url": direct_url,
                },
                status=status.HTTP_200_OK,
            )

        # Check FFmpeg for audio conversion
        has_ffmpeg = check_ffmpeg()
        ffmpeg_location = get_ffmpeg_location()
        
        media_path = os.path.join(settings.MEDIA_ROOT, 'downloads')
        os.makedirs(media_path, exist_ok=True)
        
        timestamp = int(time.time())
        output_template = os.path.join(media_path, f'audio_{timestamp}.%(ext)s')
        
        ydl_opts = {
            'format': 'bestaudio/best',
            'outtmpl': output_template,
            'quiet': True,
            'no_warnings': True,
            'nocheckcertificate': True,
        }
        
        # Only add audio extraction if FFmpeg is available
        if has_ffmpeg and audio_format in ['mp3', 'aac', 'flac', 'wav', 'opus']:
            ydl_opts['postprocessors'] = [{
                'key': 'FFmpegExtractAudio',
                'preferredcodec': audio_format,
                'preferredquality': '192',
            }]
            if ffmpeg_location:
                ydl_opts['ffmpeg_location'] = ffmpeg_location
        else:
            # Without FFmpeg, download in original format
            ydl_opts['format'] = 'bestaudio[ext=m4a]/bestaudio[ext=webm]/bestaudio/best'
        ydl_opts.update(cookie_opts())
        ydl_opts['noplaylist'] = True
        ydl_opts.update(impersonate_opts())
        ydl_opts.update(js_runtime_opts())
        ydl_opts.update(proxy_opts(url))

        try:
            with yt_dlp.YoutubeDL(ydl_opts) as ydl:
                info = ydl.extract_info(url, download=False)
                
                video_download = VideoDownload.objects.create(
                    url=url,
                    title=info.get('title', ''),
                    platform=info.get('extractor_key', ''),
                    thumbnail=info.get('thumbnail', ''),
                    duration=info.get('duration'),
                    quality='audio',
                    status='downloading'
                )
                
                ydl.download([url])
                
                downloaded_files = [f for f in os.listdir(media_path) 
                                  if f.startswith(f'audio_{timestamp}')]
                
                if not downloaded_files:
                    video_download.status = 'failed'
                    video_download.save()
                    raise Exception('Downloaded file not found')
                
                filename = downloaded_files[0]
                file_path = os.path.join(media_path, filename)
                file_size = os.path.getsize(file_path)
                
                video_download.file_path = f'downloads/{filename}'
                video_download.file_size = file_size
                video_download.status = 'completed'
                video_download.save()
                
                response_data = {
                    'success': True,
                    'message': 'Audio downloaded successfully',
                    'id': video_download.id,
                    'filename': filename,
                    'size': file_size,
                    'download_url': f'/api/file/{video_download.id}/',
                }
                
                if not has_ffmpeg:
                    response_data['warning'] = f'FFmpeg not installed. Audio downloaded in original format instead of {audio_format}.'
                
                return Response(response_data, status=status.HTTP_200_OK)
                
        except Exception as e:
            error_message = str(e)
            
            # Update database record if it exists
            try:
                if 'video_download' in locals():
                    video_download.status = 'failed'
                    video_download.save()
            except:
                pass
            
            if 'ffmpeg' in error_message.lower():
                return Response({
                    'success': False,
                    'error': 'FFmpeg is required for audio conversion',
                    'details': error_message,
                    'solution': 'Please install FFmpeg or download audio in original format',
                }, status=status.HTTP_424_FAILED_DEPENDENCY)
            
            return Response({
                'success': False,
                'error': friendly_error(e, 'Failed to download audio'),
                'details': error_message
            }, status=status.HTTP_500_INTERNAL_SERVER_ERROR)


class DownloadFileView(APIView):
    """Serve downloaded file"""
    
    def get(self, request, pk):
        try:
            video_download = VideoDownload.objects.get(pk=pk)
            file_path = os.path.join(settings.MEDIA_ROOT, video_download.file_path)
            
            if not os.path.exists(file_path):
                raise Http404('File not found')
            
            response = FileResponse(
                open(file_path, 'rb'),
                content_type='application/octet-stream'
            )
            response['Content-Disposition'] = f'attachment; filename="{os.path.basename(file_path)}"'
            return response
            
        except VideoDownload.DoesNotExist:
            raise Http404('Download record not found')


class SupportedSitesView(APIView):
    """List all supported sites"""
    
    def get(self, request):
        try:
            extractors = yt_dlp.extractor.gen_extractor_classes()
            extractor_names = [e.IE_NAME for e in extractors if hasattr(e, 'IE_NAME')]
            
            return Response({
                'success': True,
                'count': len(extractor_names),
                'extractors': sorted(extractor_names)[:100],
                'message': f'Total {len(extractor_names)} sites supported'
            }, status=status.HTTP_200_OK)
            
        except Exception as e:
            return Response({
                'success': False,
                'error': str(e)
            }, status=status.HTTP_500_INTERNAL_SERVER_ERROR)


class HealthCheckView(APIView):
    """API health check"""
    
    def get(self, request):
        try:
            # Check yt-dlp version
            version = yt_dlp.version.__version__
            
            # Check FFmpeg
            has_ffmpeg = check_ffmpeg()
            ffmpeg_location = get_ffmpeg_location()
            ffmpeg_version = None
            
            if has_ffmpeg:
                try:
                    result = subprocess.run(
                        ['ffmpeg', '-version'],
                        capture_output=True,
                        text=True,
                        timeout=5
                    )
                    if result.returncode == 0:
                        # Extract version from first line
                        first_line = result.stdout.split('\n')[0]
                        ffmpeg_version = first_line
                except:
                    ffmpeg_version = 'Installed (version check failed)'
            
            return Response({
                'status': 'ok',
                'message': 'API is running',
                'yt_dlp_version': version,
                'ffmpeg_installed': has_ffmpeg,
                'ffmpeg_location': ffmpeg_location,
                'ffmpeg_version': ffmpeg_version,
                'capabilities': {
                    'video_merge': has_ffmpeg,
                    'audio_conversion': has_ffmpeg,
                    'high_quality': has_ffmpeg,
                }
            }, status=status.HTTP_200_OK)
            
        except Exception as e:
            return Response({
                'status': 'error',
                'message': str(e)
            }, status=status.HTTP_500_INTERNAL_SERVER_ERROR)


class DownloadHistoryView(APIView):
    """Get download history"""
    
    def get(self, request):
        downloads = VideoDownload.objects.all().order_by('-created_at')[:50]
        serializer = VideoDownloadSerializer(downloads, many=True)
        return Response({
            'success': True,
            'count': downloads.count(),
            'downloads': serializer.data
        }, status=status.HTTP_200_OK)