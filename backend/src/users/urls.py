from django.urls import path

from users.views import UserCreateListAPIView, UserRetrieveUpdateDestroyAPIView

urlpatterns = [
  path('', UserCreateListAPIView.as_view(), name='users-list-create'),
  path('<id>/', UserRetrieveUpdateDestroyAPIView.as_view(), name='user-retrieve-update-destroy'),
]