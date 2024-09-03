from django.db import models
from django.contrib.auth.models import AbstractUser

class User(AbstractUser):
    bio = models.TextField(max_length=500, blank=True)
    location = models.CharField(max_length=100, blank=True)
    birth_date = models.DateField(null=True, blank=True)

class Trip(models.Model):
    title = models.CharField(max_length=200)
    description = models.TextField()
    start_date = models.DateField()
    end_date = models.DateField()
    creator = models.ForeignKey(User, on_delete=models.CASCADE, related_name='created_trips')
    participants = models.ManyToManyField(User, related_name='joined_trips')
    cover_image = models.ImageField(upload_to='trip_covers/', null=True, blank=True)

class Message(models.Model):
    trip = models.ForeignKey(Trip, on_delete=models.CASCADE, related_name='messages')
    sender = models.ForeignKey(User, on_delete=models.CASCADE)
    content = models.TextField()
    timestamp = models.DateTimeField(auto_now_add=True)

    class Meta:
        ordering = ['timestamp']