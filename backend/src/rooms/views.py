from rest_framework import generics, status
from django.db.models import Q
from rest_framework.response import Response

from rooms.models import Room, RoomUser
from rooms.serializers import RoomSerializer, RoomUserSerializer


class RoomCreateListAPIView(generics.CreateAPIView, generics.ListAPIView):
    serializer_class = RoomSerializer

    def get_queryset(self):
        qs = Room.objects.filter(soft_delete__isnull=True)

        user = self.request.user
        rooms = RoomUser.objects.filter(soft_delete__isnull=True, user=user).values_list('room')

        return Room.objects.filter(Q(soft_delete__isnull=True), Q(id__in=rooms) | Q(owner=user))

    # def create(self, request, *args, **kwargs):
    #     print(request.data)
    #     serializer = self.serializer_class(data=request.data)

    #     if serializer.is_valid():
    #         # serializer.data.owner = request.user
    #         serializer.save()

    #         return Response(serializer.data, status=status.HTTP_201_CREATED)

    #     return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


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