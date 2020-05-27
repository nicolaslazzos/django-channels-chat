from rest_framework import generics

from rooms.models import Room, RoomUser
from rooms.serializers import RoomSerializer, RoomUserSerializer


class RoomCreateListAPIView(generics.CreateAPIView, generics.ListAPIView):
    serializer_class = RoomSerializer

    def get_queryset(self):
        qs = Room.objects.filter(soft_delete__isnull=True)

        user = request.user
        rooms = RoomUser.objects.filter(soft_delete__isnull=True, user=user).values_list('room')

        return Room.objects.filter(soft_delete__isnull=True, id__in=rooms)


class RoomRetrieveUpdateDestroyAPIView(generics.RetrieveUpdateDestroyAPIView):
    serializer_class = RoomSerializer
    lookup_field = 'id'

    def get_queryset(self):
        return Room.objects.filter(soft_delete__isnull=True)


class RoomUserCreateAPIView(generics.CreateAPIView):
    serializer_class = RoomUserSerializer

    def get_queryset(self):
        return RoomUser.objects.filter(soft_delete__isnull=True)


class RoomUserRetrieveUpdateDestroyAPIView(generics.RetrieveUpdateDestroyAPIView):
    serializer_class = RoomUserSerializer
    lookup_field = 'id'

    def get_queryset(self):
        return RoomUser.objects.filter(soft_delete__isnull=True)