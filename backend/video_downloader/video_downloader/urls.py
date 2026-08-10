from django.contrib import admin
from django.urls import path, include
from django.conf import settings
from django.conf.urls.static import static
from django.http import JsonResponse

def home(request):
    return JsonResponse({
        "status": "ok",
        "message": "Video Downloader API is running",
        "endpoints": {
            "api": "/api/",
            "admin": "/admin/",
            "health": "/api/health/"
        }
    })

urlpatterns = [
    path('', home, name='home'),  # Add this
    path('admin/', admin.site.urls),
    path('api/', include('downloader.urls')),
]

if settings.DEBUG:
    urlpatterns += static(settings.MEDIA_URL, document_root=settings.MEDIA_ROOT)