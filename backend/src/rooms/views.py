from rest_framework import generics, status
from django.db.models import Q
from rest_framework.response import Response

from django.contrib.auth.models import User
from rooms.models import Room, RoomUser
from rooms.serializers import RoomSerializer, RoomUserSerializer


class RoomCreateListAPIView(generics.CreateAPIView, generics.ListAPIView):
    serializer_class = RoomSerializer

    def get_queryset(self):
        qs = Room.objects.filter(soft_delete__isnull=True)

        user = self.request.user
        rooms = RoomUser.objects.filter(soft_delete__isnull=True, user=user).values_list('room')

        return Room.objects.filter(Q(soft_delete__isnull=True), Q(id__in=rooms) | Q(owner=user))


class RoomRetrieveUpdateDestroyAPIView(generics.RetrieveUpdateDestroyAPIView):
    serializer_class = RoomSerializer
    lookup_field = 'id'

    def get_queryset(self):
        return Room.objects.filter(soft_delete__isnull=True)


class RoomUserCreateAPIView(generics.CreateAPIView):
    serializer_class = RoomUserSerializer

    def get_queryset(self):
        return RoomUser.objects.filter(soft_delete__isnull=True)

    def create(self, request, *args, **kwargs):
        room_id = request.data['room']
        username = request.data['user']
        password = request.data['password']

        room = Room.objects.get(id=room_id)
        user = User.objects.get(username=username)

        serializer = self.serializer_class(data={ 'room': room.id, 'user': user.id })

        if serializer.is_valid() and room.check_password(password):
            serializer.save()
            room_serializer = RoomSerializer(room)

            return Response(room_serializer.data, status=status.HTTP_201_CREATED)

        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


class RoomUserRetrieveUpdateDestroyAPIView(generics.RetrieveUpdateDestroyAPIView):
    serializer_class = RoomUserSerializer
    lookup_field = 'id'

    def get_queryset(self):
        return RoomUser.objects.filter(soft_delete__isnull=True)