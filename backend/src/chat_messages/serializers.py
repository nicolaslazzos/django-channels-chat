from rest_framework import serializers

from chat_messages.models import Message


class MessageSerializer(serializers.ModelSerializer):
      class Meta:
        model = Message
        fields = [
          'id',
          'text',
          'author',
          'room',
          'sent',
          'soft_delete',
        ]
        read_only_fields = ['id']
        extra_kwargs = {
          'soft_delete': { 'write_only': True },
        }