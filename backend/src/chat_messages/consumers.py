import asyncio
import json

from django.contrib.auth import get_user_model
from channels.consumer import AsyncConsumer
from channels.db import database_sync_to_async

from chat_messages.models import Message
from rooms.models import Room, RoomUser

from chat_messages.serializers import MessageSerializer

from django.contrib.auth.models import User
from users.serializers import UserSerializer


class ChatConsumer(AsyncConsumer):
    async def websocket_connect(self, event):
        print('connected', event)

        room_name = self.scope['url_route']['kwargs']['room']
        chat_room = await self.get_chat_room(room_name)

        if not chat_room.exists():
            return await self.send({ 'type': 'websocket.disconnect', 'text': 'invalid chat room name' })
            
        self.chat_room = chat_room.id
        await self.channel_layer.group_add(chat_room.id, self.channel_name)

        await self.send({ 'type': 'websocket.accept' })

        # messages = await self.get_messages(chat_room.id)
        # await self.send({ 'type': 'websocket.send', 'text': messages })
    
    async def websocket_receive(self, event):
        print('receive', event)

        new_message = event.get('text', None)

        if new_message is not None:
            new_message = json.loads(new_message)
            new_event = { 'type': 'chat_message', 'text': json.dumps(new_message) }

            await self.channel_layer.group_send(self.chat_room, new_event)

    async def chat_message(self, event):
        await self.send({ 'type': 'websocket.send', 'text': event['message'] })
    
    async def websocket_disconnect(self, event):
        print('disconnected', event)

    @database_sync_to_async
    def get_messages(self, room):
        messages = Message.objects.filter(soft_delete__isnull=True, room=room)
        serializer = MessageSerializer(messages, many=True)
        return json.dumps(serializer.data)

    @database_sync_to_async
    def get_chat_room(self, room_name):
        return Room.objects.get(id=room_name)
