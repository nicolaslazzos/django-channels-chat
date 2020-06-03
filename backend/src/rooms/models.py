from django.db import models

from django.contrib.auth.models import User


class Room(models.Model):
    id = models.CharField(max_length=100, primary_key=True, unique=True)
    label = models.CharField(max_length=100)
    password = models.CharField(max_length=128)
    owner = models.ForeignKey(User, on_delete=models.CASCADE)
    created = models.DateTimeField(auto_now_add=True, editable=False, blank=True)
    soft_delete = models.DateTimeField(null=True, blank=True)

    def __str__(self):
        return self.id


class RoomUser(models.Model):
    room = models.ForeignKey(Room, on_delete=models.CASCADE)
    user = models.ForeignKey(User, on_delete=models.CASCADE)
    joined = models.DateTimeField(auto_now_add=True, editable=False, blank=True)
    soft_delete = models.DateTimeField(null=True, blank=True)

    def __str__(self):
        return str(self.room) + ' - ' + str(self.user)