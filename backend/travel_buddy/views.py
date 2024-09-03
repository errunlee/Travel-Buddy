from rest_framework import viewsets, permissions, status
from rest_framework.decorators import action
from rest_framework.response import Response
from rest_framework_simplejwt.tokens import RefreshToken
from django.contrib.auth import authenticate
from django.shortcuts import get_object_or_404
from .models import User, Trip, Message
from .serializers import UserSerializer, TripSerializer, MessageSerializer

class UserViewSet(viewsets.ModelViewSet):
    queryset = User.objects.all()
    serializer_class = UserSerializer
    # permission_classes = [permissions.IsAuthenticated]

    @action(detail=False, methods=['post'], permission_classes=[permissions.AllowAny])
    def register(self, request):
        serializer = UserSerializer(data=request.data)
        if serializer.is_valid():
            user = serializer.save()
            return Response({
                'id': user.id,
                'username': user.username,
                'email': user.email,
                'bio': user.bio,
                'location': user.location,
                'birth_date': user.birth_date,
            }, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

    @action(detail=False, methods=['post'], permission_classes=[permissions.AllowAny])
    def login(self, request):
        username = request.data.get('username')
        password = request.data.get('password')
        user = authenticate(username=username, password=password)
        if user:
            refresh = RefreshToken.for_user(user)
            return Response({
                'access': str(refresh.access_token),
            })
        return Response({'error': 'Invalid credentials'}, status=status.HTTP_401_UNAUTHORIZED)

class TripViewSet(viewsets.ModelViewSet):
    queryset = Trip.objects.all()
    serializer_class = TripSerializer
    # permission_classes = [permissions.IsAuthenticated]

    def perform_create(self, serializer):
        serializer.save(creator=self.request.user)
    
    @action(detail=False, methods=['get'])
    def my_trips(self, request):
        """
        List all trips where the user is a participant.
        """
        user = request.user
        my_trips = Trip.objects.filter(participants=user)
        serializer = self.get_serializer(my_trips, many=True)
        return Response(serializer.data)

    @action(detail=True, methods=['post'])
    def join(self, request, pk=None):
        trip = self.get_object()
        if request.user in trip.participants.all():
            return Response({'status': 'Already joined this trip'}, status=status.HTTP_400_BAD_REQUEST)
        trip.participants.add(request.user)
        return Response({'status': 'joined trip'})

    @action(detail=True, methods=['post'])
    def leave(self, request, pk=None):
        trip = self.get_object()
        if request.user not in trip.participants.all():
            return Response({'status': 'Not a participant of this trip'}, status=status.HTTP_400_BAD_REQUEST)
        trip.participants.remove(request.user)
        return Response({'status': 'left trip'})

    @action(detail=True, methods=['get'])
    def messages(self, request, pk=None):
        trip = self.get_object()
        messages = trip.messages.all()
        serializer = MessageSerializer(messages, many=True)
        return Response(serializer.data)

class MessageViewSet(viewsets.ModelViewSet):
    # queryset = Message.objects.all()
    serializer_class = MessageSerializer
    # permission_classes = [permissions.IsAuthenticated]

    def get_queryset(self):
        trip_id = self.kwargs.get('trip_pk')
        if trip_id is not None:
            trip = get_object_or_404(Trip, pk=trip_id)
            return Message.objects.filter(trip=trip)
        return Message.objects.none()

    def perform_create(self, serializer):
        serializer.save(sender=self.request.user)