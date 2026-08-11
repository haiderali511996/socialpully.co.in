"""Entry point for cPanel's "Setup Python App" (Phusion Passenger).

Passenger imports this file from the application root and looks for a module
level `application` callable. Point the app's "Application root" at the
directory containing this file (the one with manage.py in it).

Configuration comes from environment variables, or from a .env file next to
this one, which is usually less fiddly than a host's config UI. That file is
read by settings.py rather than here, so management commands and cron jobs
get the same configuration as the live site.
"""
import os
import sys

BASE_DIR = os.path.dirname(os.path.abspath(__file__))
if BASE_DIR not in sys.path:
    sys.path.insert(0, BASE_DIR)

os.environ.setdefault('DJANGO_SETTINGS_MODULE', 'video_downloader.settings')

# Reuse the project's WSGI app so WhiteNoise static serving is applied here too.
from video_downloader.wsgi import application  # noqa: E402,F401
