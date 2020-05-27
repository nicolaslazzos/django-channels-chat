from rest_framework import serializers

from rooms.models import Room, RoomUser

class RoomSerializer(serializers.ModelSerializer):
    class Meta:
        model = Room
        fields = [
          'id',
          'name',
          'password',
          'owner',
          'created',
          'soft_delete',
        ]
        read_only_fields = ['id']
        extra_kwargs = {
          'soft_delete': { 'write_only': True },
          'password': { 'write_only': True },
        }


class RoomUserSerializer(serializers.ModelSerializer):
    class Meta:
        model = RoomUser
        fields = [
          'id', 
          'room', 
          'user',
          'joined',
          'soft_delete',
        ]
        read_only_fields = ['id']
        extra_kwargs = {
          'soft_delete': { 'write_only': True },
        }