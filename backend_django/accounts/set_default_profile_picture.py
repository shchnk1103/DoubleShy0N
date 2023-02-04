from django.core.management import BaseCommand

from accounts.models import User


class Command(BaseCommand):
    help = 'Set default profile picture for existing users'

    def handle(self, *args, **kwargs):
        users = User.objects.filter(profile_picture='')
        for user in users:
            user.profile_picture = 'profile_pictures/default.png'
            user.save()
        self.stdout.write(self.style.SUCCESS('Default profile picture set for existing users'))
