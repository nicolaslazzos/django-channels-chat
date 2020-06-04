import json

from channels.generic.websocket import AsyncWebsocketConsumer
from channels.db import database_sync_to_async

from django.contrib.auth.models import User
from chat_messages.models import Message
from rooms.models import Room, RoomUser

from chat_messages.serializers import MessageSerializer
from users.serializers import UserSerializer


class ChatConsumer(AsyncWebsocketConsumer):
    async def connect(self):
        self.room_name = self.scope['url_route']['kwargs']['room_id']
        self.room_group_name = 'room_%s' % self.room_name
        
        user = self.scope['user']
        room = await self.get_chat_room(self.room_name)

        # join room group
        await self.channel_layer.group_add(
            self.room_group_name,
            self.channel_name
        )

        await self.accept()

        await self.fetch_messages(room)


    async def disconnect(self, close_code):
        # Leave room group
        await self.channel_layer.group_discard(
            self.room_group_name,
            self.channel_name
        )

    # Receive message from WebSocket
    async def receive(self, text_data):
        text_data_json = json.loads(text_data)
        message = text_data_json['message']

        # Send message to room group
        await self.channel_layer.group_send(
            self.room_group_name,
            {
                'type': 'send_message',
                'message': message
            }
        )

    # Receive message from room group
    async def send_message(self, event):
        message = event['message']

        # Send message to WebSocket
        await self.send(text_data=message)

    async def fetch_messages(self, room):
        messages = await self.get_serialized_messages(room)

        await self.channel_layer.group_send(self.room_group_name,{ 'type': 'send_message', 'message': messages })

    # def new_message(self, data):
    #     user_contact = get_user_contact(data['from'])
    #     message = Message.objects.create(
    #         contact=user_contact,
    #         content=data['message'])
    #     current_chat = get_current_chat(data['chatId'])
    #     current_chat.messages.add(message)
    #     current_chat.save()
    #     content = {
    #         'command': 'new_message',
    #         'message': self.message_to_json(message)
    #     }
    #     return self.send_chat_message(content)

    # commands = {
    #     'fetch_messages': fetch_messages,
    #     'new_message': new_message
    # }

    commands = {
        'fetch_messages': fetch_messages,
        # 'new_message': new_message
    }


    @database_sync_to_async
    def get_serialized_messages(self, room):
        messages = Message.objects.filter(soft_delete__isnull=True, room=room)
        serializer = MessageSerializer(messages, many=True)
        print(serializer.data)
        return json.dumps(serializer.data)

    @database_sync_to_async
    def get_chat_room(self, room_id):
        return Room.objects.get(id=room_id)
