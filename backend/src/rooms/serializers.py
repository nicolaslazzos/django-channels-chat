from rest_framework import serializers

from rooms.models import Room, RoomUser

class RoomSerializer(serializers.ModelSerializer):
    owner = serializers.CharField(read_only=True, source='owner.username')

    def create(self, validated_data):
        password = validated_data.pop('password', None)
        instance = self.Meta.model(**validated_data)

        if password is not None:
            instance.password = password

        user = self.context['request'].user
        instance.owner = user

        instance.save()
        return instance

    class Meta:
        model = Room
        fields = [
          'id',
          'label',
          'password',
          'owner',
          'created',
          'soft_delete',
        ]
        read_only_fields = ['created']
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