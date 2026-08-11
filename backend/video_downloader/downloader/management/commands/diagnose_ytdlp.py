import os

import yt_dlp
from django.conf import settings
from django.core.management.base import BaseCommand

from downloader.views import cookie_opts, impersonate_opts, js_runtime_opts


class _SilentLogger:
    """Swallow yt-dlp's own stderr output.

    Errors are reported by this command from the raised exception instead, so
    without this each failure prints twice — once by yt-dlp, once by us.
    """

    def debug(self, msg):
        pass

    def info(self, msg):
        pass

    def warning(self, msg):
        pass

    def error(self, msg):
        pass


class Command(BaseCommand):
    help = (
        'Try one URL through each combination of cookies / browser impersonation / '
        'JS runtime, and report which combinations actually work. These layers each '
        'help on some sites and can hurt on others, so when a platform starts '
        'failing this isolates which one is responsible instead of guessing.'
    )

    def add_arguments(self, parser):
        parser.add_argument('url', help='Video URL to test.')
        parser.add_argument(
            '--download',
            action='store_true',
            help=(
                'Also attempt a real download to a temp file. Slower, but some '
                'failures (notably an empty file) only appear at download time, '
                'not during metadata extraction.'
            ),
        )

    def _combinations(self):
        cookies = cookie_opts()
        impersonate = impersonate_opts()
        js = js_runtime_opts()

        combos = [('baseline (nothing)', {})]
        if cookies:
            combos.append(('cookies', dict(cookies)))
        if impersonate:
            combos.append(('impersonation', dict(impersonate)))
        if js:
            combos.append(('js runtime', dict(js)))
        if cookies and impersonate:
            combos.append(('cookies + impersonation', {**cookies, **impersonate}))
        if cookies and js:
            combos.append(('cookies + js runtime', {**cookies, **js}))
        if cookies and impersonate and js:
            combos.append(('cookies + impersonation + js (what the app uses)',
                           {**cookies, **impersonate, **js}))
        return combos, cookies, impersonate, js

    def handle(self, *args, **options):
        url = options['url']
        do_download = options['download']

        combos, cookies, impersonate, js = self._combinations()

        self.stdout.write('Configured layers:')
        self.stdout.write(f'  cookies file : {settings.YTDLP_COOKIES_FILE if cookies else "NOT FOUND / disabled"}')
        self.stdout.write(f'  impersonation: {impersonate.get("impersonate") if impersonate else "unavailable / disabled"}')
        self.stdout.write(f'  js runtime   : {js.get("js_runtimes") if js else "unavailable / not installed"}')
        self.stdout.write(f'  yt-dlp       : {yt_dlp.version.__version__}')
        self.stdout.write('')

        results = []
        for label, extra in combos:
            ydl_opts = {
                'quiet': True,
                'no_warnings': True,
                'nocheckcertificate': True,
                'noplaylist': True,
                'skip_download': not do_download,
                'logger': _SilentLogger(),
            }
            ydl_opts.update(extra)
            if do_download:
                ydl_opts['outtmpl'] = os.path.join('/tmp', 'ytdlp_diag_%(id)s.%(ext)s')

            self.stdout.write(f'-> {label} ... ', ending='')
            self.stdout.flush()
            try:
                with yt_dlp.YoutubeDL(ydl_opts) as ydl:
                    info = ydl.extract_info(url, download=do_download)
                if do_download:
                    path = ydl.prepare_filename(info)
                    size = os.path.getsize(path) if os.path.exists(path) else 0
                    if size == 0:
                        raise Exception('downloaded file is empty (0 bytes)')
                    detail = f'{size / 1048576:.1f} MB'
                    try:
                        os.remove(path)
                    except OSError:
                        pass
                else:
                    detail = f'{len(info.get("formats") or [])} formats'
                self.stdout.write(self.style.SUCCESS(f'OK ({detail})'))
                results.append((label, True, detail))
            except Exception as e:
                msg = str(e).replace('\n', ' ')[:130]
                self.stdout.write(self.style.ERROR('FAILED'))
                self.stdout.write(f'     {msg}')
                results.append((label, False, msg))

        self.stdout.write('')
        working = [label for label, ok, _ in results if ok]
        if working:
            self.stdout.write(self.style.SUCCESS(f'Working combinations: {len(working)}/{len(results)}'))
            for label in working:
                self.stdout.write(f'  - {label}')
            self.stdout.write('')
            self.stdout.write(
                'If a narrower combination works but the full one does not, the extra '
                'layer is hurting. Impersonation can be turned off with '
                'YTDLP_ENABLE_IMPERSONATION=False in .env (then restart).'
            )
        else:
            self.stdout.write(self.style.WARNING(
                'Nothing worked. That points at the account/IP being blocked rather '
                'than at any one layer — the same combination failing with and '
                'without cookies means the block is not about authentication. '
                'Wait for it to clear, or re-export fresh cookies.'
            ))
