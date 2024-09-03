import json
import importlib
from channels.generic.websocket import AsyncWebsocketConsumer
from channels.db import database_sync_to_async

class ChatConsumer(AsyncWebsocketConsumer):
    async def connect(self):
        self.trip_id = self.scope['url_route']['kwargs']['trip_id']
        self.room_group_name = f'chat_{self.trip_id}'

        # Join room group
        await self.channel_layer.group_add(
            self.room_group_name,
            self.channel_name
        )

        await self.accept()

    async def disconnect(self, close_code):
        # Leave room group
        await self.channel_layer.group_discard(
            self.room_group_name,
            self.channel_name
        )

    async def receive(self, text_data):
        import json
        from .models import Trip, Message, User  # Import here
        
        try:
            text_data_json = json.loads(text_data)
            message = text_data_json['message']
            user_id = text_data_json['user_id']
            
            # Save message to database
            await self.save_message(user_id, self.trip_id, message)
            
            # Send message to room group
            await self.channel_layer.group_send(
                self.room_group_name,
                {
                    'type': 'chat_message',
                    'message': message,
                    'user_id': user_id
                }
            )
        except json.JSONDecodeError as e:
            print(f"JSONDecodeError: {e} - Received data: {text_data}")
        except KeyError as e:
            print(f"KeyError: Missing key {e} - Received data: {text_data}")
        except Exception as e:
            print(f"Exception: {e} - Received data: {text_data}")

    async def chat_message(self, event):
        message = event['message']
        user_id = event['user_id']

        # Send message to WebSocket
        await self.send(text_data=json.dumps({
            'message': message,
            'user_id': user_id
        }))

    @database_sync_to_async
    def save_message(self, user_id, trip_id, message_content):
        from .models import Trip, Message, User
        user = User.objects.get(id=user_id)
        trip = Trip.objects.get(id=trip_id)
        Message.objects.create(sender=user, trip=trip, content=message_content)