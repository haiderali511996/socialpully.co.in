import os
import time

from django.conf import settings
from django.core.management.base import BaseCommand

from downloader.models import VideoDownload


class Command(BaseCommand):
    help = (
        'Delete files in MEDIA_ROOT/downloads older than --hours and mark the '
        'matching VideoDownload rows as expired. Nothing else prunes these '
        'files, so on a host with a disk quota this needs to run on a cron.'
    )

    def add_arguments(self, parser):
        parser.add_argument(
            '--hours',
            type=float,
            default=6,
            help='Delete files last modified more than this many hours ago (default: 6).',
        )
        parser.add_argument(
            '--dry-run',
            action='store_true',
            help='Report what would be deleted without touching anything.',
        )

    def handle(self, *args, **options):
        hours = options['hours']
        dry_run = options['dry_run']
        cutoff = time.time() - (hours * 3600)

        downloads_dir = os.path.join(settings.MEDIA_ROOT, 'downloads')
        if not os.path.isdir(downloads_dir):
            self.stdout.write(f'Nothing to do: {downloads_dir} does not exist.')
            return

        deleted, freed, failed = [], 0, 0

        for name in os.listdir(downloads_dir):
            path = os.path.join(downloads_dir, name)
            if not os.path.isfile(path):
                continue
            try:
                stat = os.stat(path)
            except OSError:
                continue
            if stat.st_mtime >= cutoff:
                continue

            if dry_run:
                deleted.append(name)
                freed += stat.st_size
                continue

            try:
                os.remove(path)
            except OSError as exc:
                failed += 1
                self.stderr.write(f'Could not delete {name}: {exc}')
            else:
                deleted.append(name)
                freed += stat.st_size

        # Keep the database honest: a row pointing at a file that no longer
        # exists otherwise serves a confusing 404 from /api/file/<pk>/.
        expired = 0
        if deleted and not dry_run:
            stale = VideoDownload.objects.exclude(file_path='').exclude(status='expired')
            for record in stale:
                full_path = os.path.join(settings.MEDIA_ROOT, record.file_path)
                if not os.path.exists(full_path):
                    record.file_path = ''
                    record.status = 'expired'
                    record.save(update_fields=['file_path', 'status'])
                    expired += 1

        prefix = 'Would delete' if dry_run else 'Deleted'
        self.stdout.write(
            self.style.SUCCESS(
                f'{prefix} {len(deleted)} file(s), {freed / 1048576:.1f} MB, '
                f'older than {hours}h. Rows expired: {expired}. Failures: {failed}.'
            )
        )
