from django.db import models
from django.utils import timezone

class VideoDownload(models.Model):
    url = models.URLField(max_length=1000)
    title = models.CharField(max_length=500, blank=True)
    platform = models.CharField(max_length=100, blank=True)
    thumbnail = models.URLField(max_length=1000, blank=True)
    duration = models.IntegerField(null=True, blank=True)
    quality = models.CharField(max_length=50, default='best')
    file_path = models.CharField(max_length=500, blank=True)
    file_size = models.BigIntegerField(null=True, blank=True)
    status = models.CharField(max_length=50, default='pending')
    created_at = models.DateTimeField(default=timezone.now)
    
    class Meta:
        ordering = ['-created_at']
    
    def __str__(self):
        return f"{self.title[:50]} - {self.platform}"
