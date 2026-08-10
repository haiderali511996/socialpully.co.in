'use client';
import { useState } from 'react';
import { Download, Loader, CheckCircle, AlertCircle, Video, Info, Clock, Eye, X } from 'lucide-react';

const API_BASE =
  process.env.NEXT_PUBLIC_API_BASE?.replace(/\/$/, '') ||
  'https://socialpullybackend-production.up.railway.app';

const PLATFORM_CONFIG = {
  instagram: {
    label: 'Download Instagram Reels',
    placeholder: 'Paste Instagram Reel URL here...',
    color: '#c13584',
  },
  tiktok: {
    label: 'Download TikTok Video',
    placeholder: 'Paste TikTok video URL here...',
    color: '#010101',
  },
  facebook: {
    label: 'Download Facebook Video',
    placeholder: 'Paste Facebook video URL here...',
    color: '#1877f2',
  },
  youtube: {
    label: 'Download YouTube Video',
    placeholder: 'Paste YouTube video URL here...',
    color: '#ff0000',
  },
  twitter: {
    label: 'Download Twitter Video',
    placeholder: 'Paste Twitter/X video URL here...',
    color: '#1da1f2',
  },
  pinterest: {
    label: 'Download Pinterest Video',
    placeholder: 'Paste Pinterest video URL here...',
    color: '#e60023',
  },
  all: {
    label: 'Download Video',
    placeholder: 'Paste video URL from any platform...',
    color: '#6366f1',
  },
};

function toAbsoluteUrl(maybeRelative) {
  try {
    return new URL(maybeRelative, API_BASE).toString();
  } catch {
    return maybeRelative;
  }
}

async function triggerBrowserDownload(fileUrl, fallbackFilename) {
  const iframe = document.createElement('iframe');
  iframe.style.cssText = 'position:absolute;width:0;height:0;border:0;visibility:hidden;';

  const htmlContent = `
    <!DOCTYPE html>
    <html>
    <head><meta charset="utf-8"></head>
    <body>
      <script>
        window.onload = function() {
          const a = document.createElement('a');
          a.href = '${fileUrl}';
          a.download = '${fallbackFilename || 'video.mp4'}';
          a.style.display = 'none';
          document.body.appendChild(a);
          a.click();
          setTimeout(() => {
            window.parent.postMessage('download-started', '*');
          }, 100);
        };
      <\/script>
    </body>
    </html>
  `;

  iframe.srcdoc = htmlContent;
  document.body.appendChild(iframe);

  return new Promise((resolve) => {
    const listener = (event) => {
      if (event.data === 'download-started') {
        window.removeEventListener('message', listener);
        setTimeout(() => {
          try { document.body.removeChild(iframe); } catch {}
        }, 2000);
        resolve();
      }
    };
    window.addEventListener('message', listener);
    setTimeout(() => {
      window.removeEventListener('message', listener);
      try { document.body.removeChild(iframe); } catch {}
      resolve();
    }, 5000);
  });
}

export default function DownloadForm({ platform = 'all' }) {
  const [url, setUrl] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [videoInfo, setVideoInfo] = useState(null);
  const [downloading, setDownloading] = useState(false);
  const [quality, setQuality] = useState('best');
  const [downloadSuccess, setDownloadSuccess] = useState(false);
  const [downloadUrl, setDownloadUrl] = useState('');
  const [showModal, setShowModal] = useState(false);

  const config = PLATFORM_CONFIG[platform] || PLATFORM_CONFIG.all;

  const resetForm = () => {
    setUrl('');
    setVideoInfo(null);
    setQuality('best');
    setError('');
    setDownloadSuccess(false);
    setDownloadUrl('');
    setShowModal(false);
  };

  const fetchVideoInfo = async () => {
    if (!url.trim()) {
      setError('Please enter a valid URL');
      return;
    }
    setLoading(true);
    setError('');
    setVideoInfo(null);
    setDownloadUrl('');
    setShowModal(true);

    try {
      const response = await fetch(`${API_BASE}/api/info/`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ url }),
      });
      const data = await response.json();
      if (data.success) {
        setVideoInfo(data);
        setQuality('best');
      } else {
        throw new Error(data.error || 'Failed to fetch video information');
      }
    } catch (err) {
      setError(err.message || 'Failed to fetch video. Please check the URL and try again.');
    } finally {
      setLoading(false);
    }
  };

  const handleDownload = async () => {
    if (!videoInfo) { setError('No video information available'); return; }
    setDownloading(true);
    setDownloadSuccess(false);
    setError('');

    try {
      const response = await fetch(`${API_BASE}/api/download/`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ url, quality }),
      });
      const data = await response.json();
      if (data.success && data.download_url) {
        const absDownloadUrl = toAbsoluteUrl(data.download_url);
        setDownloadUrl(absDownloadUrl);
        const filename = data.filename || `video_${Date.now()}.${data.ext || 'mp4'}`;
        await triggerBrowserDownload(absDownloadUrl, filename);
        setDownloadSuccess(true);
        setTimeout(() => setDownloadSuccess(false), 5000);
      } else {
        throw new Error(data.error || data.details || 'Failed to get download URL');
      }
    } catch (err) {
      console.error('Download error:', err);
      setError(err.message || 'Failed to download video. Please try again.');
    } finally {
      setDownloading(false);
    }
  };

  const manualDownload = async (e) => {
    e.preventDefault();
    if (!downloadUrl) return;
    const filename = (videoInfo?.title ? `${videoInfo.title}` : `video_${Date.now()}`) + '.mp4';
    await triggerBrowserDownload(downloadUrl, filename);
  };

  const formatDuration = (seconds) => {
    if (!seconds) return 'Unknown';
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  };

  const qualityOptions = [
    { value: 'best', label: 'Best Quality' },
    { value: '1080p', label: '1080p (Full HD)' },
    { value: '720p', label: '720p (HD)' },
    { value: '480p', label: '480p (SD)' },
    { value: '360p', label: '360p (Mobile)' },
  ];

  return (
    <>
      <div className="max-w-4xl mx-auto">
        <div className="bg-white rounded-2xl shadow-2xl p-8">
          {/* URL Input */}
          <div className="mb-6">
            <input
              type="text"
              value={url}
              onChange={(e) => setUrl(e.target.value)}
              placeholder={config.placeholder}
              className="w-full px-6 py-4 text-lg border-2 border-gray-200 rounded-xl focus:border-indigo-500 focus:outline-none text-gray-800"
              disabled={loading}
              onKeyDown={(e) => { if (e.key === 'Enter' && !loading) fetchVideoInfo(); }}
            />
          </div>

          {/* Primary Download Button — platform-specific label */}
          <button
            onClick={fetchVideoInfo}
            disabled={loading}
            className="w-full text-white px-8 py-4 rounded-xl font-semibold hover:shadow-xl transition disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
            style={{
              background: loading
                ? '#9ca3af'
                : `linear-gradient(135deg, ${config.color} 0%, ${config.color}cc 100%)`,
              fontSize: '1.05rem',
            }}
          >
            {loading ? (
              <>
                <Loader className="animate-spin" size={20} />
                Fetching Video Information...
              </>
            ) : (
              <>
                <Download size={20} />
                {config.label}
              </>
            )}
          </button>

          {/* Feature Cards */}
          <div className="mt-8 grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="bg-gradient-to-br from-indigo-50 to-indigo-100 rounded-xl p-6 text-center">
              <div className="w-12 h-12 bg-indigo-600 rounded-full flex items-center justify-center mx-auto mb-3">
                <Download className="text-white" size={24} />
              </div>
              <h3 className="font-semibold text-gray-800 mb-2">Direct Downloads</h3>
              <p className="text-sm text-gray-600">No storage on our servers. Ultra-fast streaming.</p>
            </div>
            <div className="bg-gradient-to-br from-purple-50 to-purple-100 rounded-xl p-6 text-center">
              <div className="w-12 h-12 bg-purple-600 rounded-full flex items-center justify-center mx-auto mb-3">
                <Video className="text-white" size={24} />
              </div>
              <h3 className="font-semibold text-gray-800 mb-2">Multiple Qualities</h3>
              <p className="text-sm text-gray-600">Choose from 360p to 1080p quality options.</p>
            </div>
            <div className="bg-gradient-to-br from-green-50 to-green-100 rounded-xl p-6 text-center">
              <div className="w-12 h-12 bg-green-600 rounded-full flex items-center justify-center mx-auto mb-3">
                <CheckCircle className="text-white" size={24} />
              </div>
              <h3 className="font-semibold text-gray-800 mb-2">All Platforms</h3>
              <p className="text-sm text-gray-600">YouTube, Instagram, TikTok, Facebook &amp; more.</p>
            </div>
          </div>
        </div>
      </div>

      {/* Modal */}
      {showModal && (
        <div className="fixed inset-0 z-50 overflow-y-auto">
          <div
            className="fixed inset-0 bg-black bg-opacity-50 backdrop-blur-sm transition-opacity"
            onClick={() => !loading && !downloading && setShowModal(false)}
          />
          <div className="flex min-h-full items-center justify-center p-4">
            <div
              className="relative bg-white rounded-2xl shadow-2xl max-w-4xl w-full max-h-[90vh] overflow-y-auto transform transition-all animate-slideUp"
              onClick={(e) => e.stopPropagation()}
            >
              {!loading && !downloading && (
                <button onClick={() => setShowModal(false)} className="absolute top-4 right-4 z-10 p-2 rounded-full bg-gray-100 hover:bg-gray-200 transition">
                  <X size={20} className="text-gray-600" />
                </button>
              )}

              {/* Loading */}
              {loading && (
                <div className="p-12 text-center">
                  <div className="relative w-32 h-32 mx-auto mb-6">
                    <div className="absolute inset-0 border-4 border-indigo-200 rounded-full animate-ping" />
                    <div className="absolute inset-2 border-4 border-purple-200 rounded-full animate-pulse" />
                    <div className="absolute inset-4 border-4 border-indigo-300 rounded-full animate-spin" />
                    <div className="absolute inset-0 flex items-center justify-center">
                      <Video className="text-indigo-600 animate-bounce" size={48} />
                    </div>
                  </div>
                  <h3 className="text-2xl font-bold text-gray-800 mb-2 animate-pulse">Fetching Video Information</h3>
                  <p className="text-gray-600">Please wait while we retrieve video details...</p>
                  <div className="flex justify-center gap-2 mt-6">
                    <div className="w-3 h-3 bg-indigo-600 rounded-full animate-bounce" style={{ animationDelay: '0ms' }} />
                    <div className="w-3 h-3 bg-purple-600 rounded-full animate-bounce" style={{ animationDelay: '150ms' }} />
                    <div className="w-3 h-3 bg-indigo-600 rounded-full animate-bounce" style={{ animationDelay: '300ms' }} />
                  </div>
                </div>
              )}

              {/* Error */}
              {error && !loading && (
                <div className="p-8">
                  <div className="flex flex-col items-center text-center">
                    <div className="w-20 h-20 bg-red-100 rounded-full flex items-center justify-center mb-4">
                      <AlertCircle className="text-red-600" size={40} />
                    </div>
                    <h3 className="text-xl font-bold text-gray-800 mb-2">Oops! Something went wrong</h3>
                    <p className="text-red-600 mb-6">{error}</p>
                    <button onClick={() => { setError(''); setShowModal(false); }} className="px-6 py-3 bg-gradient-to-r from-indigo-600 to-purple-600 text-white rounded-xl font-semibold hover:shadow-lg transition">
                      Try Again
                    </button>
                  </div>
                </div>
              )}

              {/* Success */}
              {videoInfo && !loading && !error && (
                <div className="p-8">
                  {downloadSuccess && (
                    <div className="mb-6 bg-green-50 border-2 border-green-200 rounded-xl p-4 animate-slideDown">
                      <div className="flex items-center gap-3">
                        <div className="flex-shrink-0">
                          <div className="w-10 h-10 bg-green-600 rounded-full flex items-center justify-center">
                            <CheckCircle className="text-white" size={20} />
                          </div>
                        </div>
                        <div className="flex-1">
                          <h4 className="font-semibold text-green-800 mb-1">Download Started!</h4>
                          <p className="text-sm text-green-700">
                            Your video is downloading. If it doesn&apos;t start automatically,{' '}
                            <a href={downloadUrl} onClick={manualDownload} className="underline ml-1 font-medium">click here</a>
                          </p>
                        </div>
                      </div>
                    </div>
                  )}

                  {videoInfo.thumbnail && (
                    <div className="mb-6 rounded-xl overflow-hidden border-2 border-gray-200">
                      <div className="relative aspect-video bg-gradient-to-br from-gray-900 to-gray-800">
                        <img src={videoInfo.thumbnail} alt={videoInfo.title || 'Video thumbnail'} className="w-full h-full object-contain" />
                        <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                          <div className="w-20 h-20 bg-white bg-opacity-90 rounded-full flex items-center justify-center shadow-2xl">
                            <svg className="w-10 h-10 text-indigo-600 ml-1" fill="currentColor" viewBox="0 0 24 24"><path d="M8 5v14l11-7z" /></svg>
                          </div>
                        </div>
                      </div>
                    </div>
                  )}

                  {videoInfo.title && <h2 className="text-2xl font-bold text-gray-800 mb-4 line-clamp-2">{videoInfo.title}</h2>}

                  <div className="flex flex-wrap gap-3 mb-6">
                    {videoInfo.platform && <span className="px-4 py-2 bg-indigo-100 text-indigo-700 rounded-full text-sm font-medium capitalize">{videoInfo.platform}</span>}
                    {videoInfo.duration && <span className="px-4 py-2 bg-gray-100 text-gray-700 rounded-full text-sm font-medium flex items-center gap-2"><Clock size={16} />{formatDuration(videoInfo.duration)}</span>}
                    {videoInfo.view_count && <span className="px-4 py-2 bg-gray-100 text-gray-700 rounded-full text-sm font-medium flex items-center gap-2"><Eye size={16} />{videoInfo.view_count.toLocaleString()}</span>}
                  </div>

                  <div className="bg-gradient-to-br from-indigo-50 to-purple-50 rounded-xl p-6 mb-4">
                    <h3 className="font-semibold text-lg mb-4 flex items-center gap-2">
                      <Download className="text-indigo-600" size={20} />
                      Download Options
                    </h3>
                    <div className="flex flex-col sm:flex-row gap-4">
                      <div className="flex-1">
                        <select value={quality} onChange={(e) => setQuality(e.target.value)} className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:border-indigo-500 focus:outline-none bg-white text-gray-800 font-medium">
                          {qualityOptions.map((option) => (
                            <option key={option.value} value={option.value}>{option.label}</option>
                          ))}
                        </select>
                      </div>
                      {/* Download button — platform-specific label */}
                      <button
                        onClick={handleDownload}
                        disabled={downloading}
                        className="flex-1 text-white px-6 py-3 rounded-xl font-semibold hover:shadow-xl transition disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
                        style={{ background: downloading ? '#9ca3af' : 'linear-gradient(135deg, #16a34a 0%, #059669 100%)' }}
                      >
                        {downloading ? (
                          <><Loader className="animate-spin" size={20} />Preparing...</>
                        ) : (
                          <><Download size={20} />{config.label}</>
                        )}
                      </button>
                    </div>
                  </div>

                  {videoInfo.uploader && <p className="text-sm text-gray-600 mb-4"><span className="font-semibold">Uploader:</span> {videoInfo.uploader}</p>}

                  <button onClick={resetForm} className="w-full text-indigo-600 hover:text-indigo-800 py-3 text-sm font-medium transition border-2 border-indigo-200 rounded-lg hover:border-indigo-300 hover:bg-indigo-50">
                    Download Another Video
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>
      )}

      <style jsx>{`
        @keyframes slideUp {
          from { opacity: 0; transform: translateY(20px); }
          to { opacity: 1; transform: translateY(0); }
        }
        @keyframes slideDown {
          from { opacity: 0; transform: translateY(-10px); }
          to { opacity: 1; transform: translateY(0); }
        }
        .animate-slideUp { animation: slideUp 0.3s ease-out; }
        .animate-slideDown { animation: slideDown 0.3s ease-out; }
      `}</style>
    </>
  );
}
