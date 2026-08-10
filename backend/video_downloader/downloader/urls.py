from django.urls import path
from .views import (
    VideoInfoView,
    DownloadVideoView,
    DirectURLView,
    DownloadAudioView,
    DownloadFileView,
    SupportedSitesView,
    HealthCheckView,
    DownloadHistoryView,
)

urlpatterns = [
    path('info/', VideoInfoView.as_view(), name='video-info'),
    path('download/', DownloadVideoView.as_view(), name='download-video'),
    path('direct-url/', DirectURLView.as_view(), name='direct-url'),
    path('download-audio/', DownloadAudioView.as_view(), name='download-audio'),
    path('file/<int:pk>/', DownloadFileView.as_view(), name='download-file'),
    path('supported-sites/', SupportedSitesView.as_view(), name='supported-sites'),
    path('health/', HealthCheckView.as_view(), name='health-check'),
    path('history/', DownloadHistoryView.as_view(), name='download-history'),
]
