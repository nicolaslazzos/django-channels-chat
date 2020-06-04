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
        
        room = await self.get_chat_room(self.room_name)

        # join room group
        await self.channel_layer.group_add(
            self.room_group_name,
            self.channel_name
        )

        await self.accept()
        await self.fetch_messages(room)

    # leave room group
    async def disconnect(self, close_code):
        await self.channel_layer.group_discard(self.room_group_name, self.channel_name)

    # receive message from the socket
    async def receive(self, text_data):
        data = json.loads(text_data)
        await self.commands[data['command']](self, data['data'])

    # finally send message to the socket
    async def send_message(self, event):
        message = event['message']
        await self.send(text_data=message)

    # fetch room messages and send it to the group
    async def fetch_messages(self, room):
        messages = await self.get_serialized_messages(room)
        await self.channel_layer.group_send(self.room_group_name,{ 'type': 'send_message', 'message': messages })

    # saves message to db and fetch messages again
    async def new_message(self, data):
        text = data['text']
        username = data['author']

        await self.create_room_message(text, username, self.room_name)
        await self.fetch_messages(self.room_name)

    commands = {
        'fetch_messages': fetch_messages,
        'new_message': new_message
    }

    @database_sync_to_async
    def create_room_message(self, text, username, room):
        author = User.objects.get(username=username)
        room = Room.objects.get(id=room)
        return Message.objects.create(author=author, text=text, room=room)

    @database_sync_to_async
    def get_serialized_messages(self, room):
        messages = Message.objects.filter(soft_delete__isnull=True, room=room)
        serializer = MessageSerializer(messages, many=True)
        return json.dumps(serializer.data)

    @database_sync_to_async
    def get_chat_room(self, room):
        return Room.objects.get(id=room)
