from rest_framework import permissions, status, generics
from rest_framework.response import Response

from django.contrib.auth.models import User
from users.serializers import UserSerializer, UserSerializerWithToken


class UserRetrieveAPIView(generics.RetrieveAPIView):
    serializer_class = UserSerializer

    def get_queryset(self):
        return User.objects.all()

    def get(self, request):
        serializer = self.serializer_class(self.request.user)
        return Response(serializer.data)


class UserCreateAPIView(generics.CreateAPIView):
    serializer_class = UserSerializerWithToken
    permission_classes = (permissions.AllowAny,)

    def get_queryset(self):
        return User.objects.all()

    def post(self, request, format=None):
        serializer = self.serializer_class(data=request.data)

        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED)

        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)