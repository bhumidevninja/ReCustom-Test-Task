from rest_framework import serializers
from .models import User, ActivityLog

class ActivityLogSerializer(serializers.ModelSerializer):
    class Meta:
        model = ActivityLog
        fields = '__all__'


class UserSerializer(serializers.ModelSerializer):
    activity_logs = ActivityLogSerializer(many=True, read_only=True)
    total_logins = serializers.SerializerMethodField()
    total_downloads = serializers.SerializerMethodField()

    class Meta:
        model = User
        fields = ['id', 'name', 'email', 'role', 'activity_logs', 'total_logins', 'total_downloads']

    def get_total_logins(self, obj):
        return obj.activity_logs.filter(activity_type='login').count()

    def get_total_downloads(self, obj):
        return obj.activity_logs.filter(activity_type='download').count()
