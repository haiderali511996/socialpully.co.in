import os
import warnings
from pathlib import Path

from django.core.management.utils import get_random_secret_key

BASE_DIR = Path(__file__).resolve().parent.parent


def _load_dotenv(path):
    """Minimal .env reader, applied before any setting is read below.

    Deliberately dependency-free: shared hosting makes adding packages
    awkward, and this only needs to handle KEY=value lines. Real environment
    variables always win, so a host's own config UI overrides the file.

    This lives in settings.py rather than in a single entry point so that
    *every* way of starting Django picks it up -- passenger_wsgi, manage.py,
    cron jobs, the shell. Loading it in only the WSGI entry point means
    management commands silently run with different configuration than the
    live site, which is how `manage.py migrate` ends up pointed at a
    different database than the running app.
    """
    if not os.path.exists(path):
        return
    with open(path, encoding='utf-8') as fh:
        for line in fh:
            line = line.strip()
            if not line or line.startswith('#') or '=' not in line:
                continue
            key, _, value = line.partition('=')
            os.environ.setdefault(key.strip(), value.strip().strip('"').strip("'"))


_load_dotenv(BASE_DIR / '.env')

DEBUG = os.environ.get('DEBUG', 'False') == 'True'

SECRET_KEY = os.environ.get('SECRET_KEY')
if not SECRET_KEY:
    if DEBUG:
        SECRET_KEY = 'django-insecure-local-development-only-do-not-use-in-production'
    else:
        # Never ship a hard-coded key. Generate an ephemeral one so the process
        # still boots, but make the misconfiguration loud (sessions and signed
        # values are invalidated on every restart until SECRET_KEY is set).
        SECRET_KEY = get_random_secret_key()
        warnings.warn(
            'SECRET_KEY is not set; using a random key generated at startup. '
            'Set the SECRET_KEY environment variable in production.',
            RuntimeWarning,
        )

ALLOWED_HOSTS = [
    h.strip() for h in os.environ.get('ALLOWED_HOSTS', '*').split(',') if h.strip()
]

# Railway (and most PaaS) terminate TLS at the edge and forward this header.
USE_X_FORWARDED_HOST = True
SECURE_PROXY_SSL_HEADER = ('HTTP_X_FORWARDED_PROTO', 'https')

if not DEBUG:
    SESSION_COOKIE_SECURE = True
    CSRF_COOKIE_SECURE = True

CSRF_TRUSTED_ORIGINS = [
    o.strip() for o in os.environ.get('CSRF_TRUSTED_ORIGINS', '').split(',') if o.strip()
]

# Add this line to fix the warning
DEFAULT_AUTO_FIELD = 'django.db.models.BigAutoField'

INSTALLED_APPS = [
    'django.contrib.admin',
    'django.contrib.auth',
    'django.contrib.contenttypes',
    'django.contrib.sessions',
    'django.contrib.messages',
    'django.contrib.staticfiles',
    'corsheaders',
    'downloader',
    'rest_framework',
    'django_celery_beat',
    'django_celery_results',
]

MIDDLEWARE = [
    'corsheaders.middleware.CorsMiddleware',
    'django.middleware.security.SecurityMiddleware',
    'whitenoise.middleware.WhiteNoiseMiddleware',
    'django.contrib.sessions.middleware.SessionMiddleware',
    'django.middleware.common.CommonMiddleware',
    'django.middleware.csrf.CsrfViewMiddleware',
    'django.contrib.auth.middleware.AuthenticationMiddleware',
    'django.contrib.messages.middleware.MessageMiddleware',
    'django.middleware.clickjacking.XFrameOptionsMiddleware',
]

ROOT_URLCONF = 'video_downloader.urls'

TEMPLATES = [
    {
        'BACKEND': 'django.template.backends.django.DjangoTemplates',
        'DIRS': [],
        'APP_DIRS': True,
        'OPTIONS': {
            'context_processors': [
                'django.template.context_processors.request',
                'django.contrib.auth.context_processors.auth',
                'django.contrib.messages.context_processors.messages',
            ],
        },
    },
]

WSGI_APPLICATION = 'video_downloader.wsgi.application'

# Set CORS_ALLOWED_ORIGINS (comma separated) to lock the API down to the
# frontend origins. Left unset it stays open, which is the current behaviour.
CORS_ALLOWED_ORIGINS = [
    o.strip() for o in os.environ.get('CORS_ALLOWED_ORIGINS', '').split(',') if o.strip()
]
CORS_ALLOW_ALL_ORIGINS = not CORS_ALLOWED_ORIGINS

MEDIA_URL = '/media/'
MEDIA_ROOT = os.path.join(BASE_DIR, 'media')

REST_FRAMEWORK = {
    'DEFAULT_RENDERER_CLASSES': [
        'rest_framework.renderers.JSONRenderer',
    ],
}

# Database - Use PostgreSQL if DATABASE_URL is set (Railway provides this)
# Otherwise fall back to SQLite for local development
DATABASE_URL = os.environ.get('DATABASE_URL')

if DATABASE_URL:
    import dj_database_url
    DATABASES = {
        'default': dj_database_url.config(default=DATABASE_URL, conn_max_age=600)
    }
else:
    DATABASES = {
        'default': {
            'ENGINE': 'django.db.backends.sqlite3',
            'NAME': BASE_DIR / 'db.sqlite3',
        }
    }

AUTH_PASSWORD_VALIDATORS = [
    {'NAME': 'django.contrib.auth.password_validation.UserAttributeSimilarityValidator'},
    {'NAME': 'django.contrib.auth.password_validation.MinimumLengthValidator'},
    {'NAME': 'django.contrib.auth.password_validation.CommonPasswordValidator'},
    {'NAME': 'django.contrib.auth.password_validation.NumericPasswordValidator'},
]

LANGUAGE_CODE = 'en-us'
TIME_ZONE = 'UTC'
USE_I18N = True
USE_TZ = True

# Static files
STATIC_URL = '/static/'
STATIC_ROOT = os.path.join(BASE_DIR, 'staticfiles')

# Caching - Use Redis only if REDIS_URL is available.
# Without it the local-memory cache is used, which is per-process: the TikTok
# direct-URL cache in downloader/views.py only works across requests when the
# server runs a single worker.
REDIS_URL = os.environ.get('REDIS_URL')

if REDIS_URL:
    CACHES = {
        'default': {
            'BACKEND': 'django_redis.cache.RedisCache',
            'LOCATION': REDIS_URL,
            'OPTIONS': {
                'CLIENT_CLASS': 'django_redis.client.DefaultClient',
            },
        }
    }
else:
    CACHES = {
        'default': {
            'BACKEND': 'django.core.cache.backends.locmem.LocMemCache',
            'LOCATION': 'socialpully-default',
        }
    }


# yt-dlp settings
# Impersonation is env-toggleable because it is not universally a win: a cookie
# session created in a real browser, replayed with curl_cffi's synthetic TLS
# fingerprint from a datacenter IP, can read as *more* suspicious to some sites
# than plain requests. Set YTDLP_ENABLE_IMPERSONATION=False to turn it off
# without a code change (see the diagnose_ytdlp management command).
YTDLP_ENABLE_IMPERSONATION = os.environ.get('YTDLP_ENABLE_IMPERSONATION', 'True') == 'True'
YTDLP_IMPERSONATE_TARGET = os.environ.get('YTDLP_IMPERSONATE_TARGET', 'chrome')
YTDLP_TIKTOK_API_HOSTNAMES = [
    "api-h2.tiktokv.com",
    "api16-normal-c-useast1a.tiktokv.com",
]

# Optional Netscape-format cookies file, exported from a browser logged into
# a real account. Instagram (and increasingly other platforms) reject most
# requests without an authenticated session; yt-dlp uses this when present
# and downloads work anonymously as before when it's absent. Never commit an
# actual cookies file — see backend/video_downloader/.gitignore.
YTDLP_COOKIES_FILE = os.environ.get('YTDLP_COOKIES_FILE', str(BASE_DIR / 'cookies.txt'))

# Optional path to a Deno binary. YouTube increasingly requires computing a
# token via JavaScript to authorize actual video downloads (separate from
# the cookie-based bot-check) — without a JS runtime available, requests can
# succeed for metadata but come back with "The downloaded file is empty" for
# the actual video. Deno is a single self-contained executable (no root or
# compiler needed); see DEPLOYMENT.md for the install steps. Absent, yt-dlp
# falls back to its previous behavior.
YTDLP_DENO_PATH = os.environ.get('YTDLP_DENO_PATH', os.path.expanduser('~/.deno/bin/deno'))