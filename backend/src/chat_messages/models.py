from django.db import models

from django.contrib.auth.models import User
from rooms.models import Room

class Message(models.Model):
    text = models.TextField()
    author = models.ForeignKey(User, on_delete=models.SET_NULL, null=True, blank=True)
    room = models.ForeignKey(Room, on_delete=models.CASCADE)
    sent = models.DateTimeField(auto_now_add=True, editable=False, blank=True)
    soft_delete = models.DateTimeField(null=True, blank=True)

    def __str__(self):
        return str(self.author) + ' - ' + str(self.room) + ' - ' + str(self.sent.strftime('%d/%m/%y %H:%M:%S'))

