from rest_framework import serializers
from .models import User, Trip, Message

class UserSerializer(serializers.ModelSerializer):
    password = serializers.CharField(write_only=True)  # Ensure password is write-only

    class Meta:
        model = User
        fields = ['id', 'username', 'email', 'bio', 'location', 'birth_date', 'password']

    def create(self, validated_data):
        # Use Django's built-in method to create a user and handle password hashing
        user = User.objects.create_user(
            username=validated_data['username'],
            email=validated_data['email'],
            password=validated_data['password'],
            bio=validated_data.get('bio', ''),
            location=validated_data.get('location', ''),
            birth_date=validated_data.get('birth_date', None)
        )
        return user

    class Meta:
        model = User
        fields = ['id', 'username', 'email', 'bio', 'location', 'birth_date', 'password']

class TripSerializer(serializers.ModelSerializer):
    class Meta:
        model = Trip
        fields = ['id', 'title', 'description', 'start_date', 'end_date', 'participants', 'cover_image']

class MessageSerializer(serializers.ModelSerializer):
    class Meta:
        model = Message
        fields = '__all__'

