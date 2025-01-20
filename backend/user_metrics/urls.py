from django.urls import path, include
from rest_framework.routers import DefaultRouter
from .viewsets import UserViewSet, ActivityLogViewSet

router = DefaultRouter()
router.register('users', UserViewSet)
router.register('activity-logs', ActivityLogViewSet)

urlpatterns = [
    path('', include(router.urls)),
]
