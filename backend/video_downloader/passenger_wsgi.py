"""Entry point for cPanel's "Setup Python App" (Phusion Passenger).

Passenger imports this file from the application root and looks for a module
level `application` callable. Point the app's "Application root" at the
directory containing this file (the one with manage.py in it).

Unlike the Next.js frontend, Django reads its configuration at request time,
so environment variables set in cPanel's UI work fine here. A .env file next
to this one is also honoured, which is usually less fiddly.
"""
import os
import sys

BASE_DIR = os.path.dirname(os.path.abspath(__file__))
if BASE_DIR not in sys.path:
    sys.path.insert(0, BASE_DIR)


def _load_dotenv(path):
    """Minimal .env reader.

    Deliberately dependency-free: shared hosting makes adding packages
    awkward, and this only needs to handle KEY=value lines. Real environment
    variables always win, so cPanel's UI overrides the file.
    """
    if not os.path.exists(path):
        return
    with open(path, encoding='utf-8') as fh:
        for line in fh:
            line = line.strip()
            if not line or line.startswith('#') or '=' not in line:
                continue
            key, _, value = line.partition('=')
            key = key.strip()
            value = value.strip().strip('"').strip("'")
            os.environ.setdefault(key, value)


_load_dotenv(os.path.join(BASE_DIR, '.env'))

os.environ.setdefault('DJANGO_SETTINGS_MODULE', 'video_downloader.settings')

# Reuse the project's WSGI app so WhiteNoise static serving is applied here too.
from video_downloader.wsgi import application  # noqa: E402,F401
