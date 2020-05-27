from rest_framework import generics

from django.contrib.auth.models import User
from users.serializers import UserSerializer

class UserCreateListAPIView(generics.CreateAPIView, generics.ListAPIView):
    serializer_class = UserSerializer

    def get_queryset(self):
        return User.objects.all()


class UserRetrieveUpdateDestroyAPIView(generics.RetrieveUpdateDestroyAPIView):
    serializer_class = UserSerializer
    lookup_field = 'id'

    def get_queryset(self):
        return User.objects.all()

