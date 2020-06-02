from django.urls import path

from users.views import UserCreateAPIView, current_user

urlpatterns = [
  path('current-user/', current_user, name='user-read'),
  path('', UserCreateAPIView.as_view(), name='user-create'),
]