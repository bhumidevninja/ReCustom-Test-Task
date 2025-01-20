from django.core.management.base import BaseCommand
from user_metrics.models import User, ActivityLog
from random import choice

class Command(BaseCommand):
    help = 'Seed database with sample data'

    def handle(self, *args, **kwargs):
        print("Coming to management command")
        roles = ['Admin', 'User']
        activities = ['login', 'download']

        for i in range(10):
            user = User.objects.create(
                name=f'User {i+1}',
                email=f'user{i+1}@gmail.com',
                role=choice(roles),
            )
            for _ in range(5):
                ActivityLog.objects.create(
                    user=user,
                    activity_type=choice(activities),
                )
        self.stdout.write('Database seeded!')
