from django.urls import path

from users.views import UserCreateAPIView, UserRetrieveAPIView

urlpatterns = [
  path('current-user/', UserRetrieveAPIView.as_view(), name='user-read'),
  path('', UserCreateAPIView.as_view(), name='user-create'),
]