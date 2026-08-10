from rest_framework import serializers
from .models import VideoDownload

class VideoDownloadSerializer(serializers.ModelSerializer):
    class Meta:
        model = VideoDownload
        fields = '__all__'
        read_only_fields = ['created_at', 'status', 'file_path', 'file_size']


class VideoInfoSerializer(serializers.Serializer):
    url = serializers.URLField(required=True)


class DownloadRequestSerializer(serializers.Serializer):
    url = serializers.URLField(required=True)
    quality = serializers.ChoiceField(
        choices=['best', '1080p', '720p', '480p', '360p'],
        default='best'
    )
    format = serializers.ChoiceField(
        choices=['mp4', 'webm', 'mkv'],
        default='mp4'
    )


class AudioDownloadSerializer(serializers.Serializer):
    url = serializers.URLField(required=True)
    format = serializers.ChoiceField(
        choices=['mp3', 'm4a', 'wav', 'flac'],
        default='mp3'
    )
