from django.db import models
from django.contrib.auth.hashers import (check_password, make_password)
from django.utils.translation import ugettext_lazy as _

from django.contrib.auth.models import User


class Room(models.Model):
    id = models.CharField(max_length=100, primary_key=True, unique=True)
    label = models.CharField(max_length=100)
    password = models.CharField(_('password'), max_length=128)
    owner = models.ForeignKey(User, on_delete=models.CASCADE)
    created = models.DateTimeField(auto_now_add=True, editable=False, blank=True)
    soft_delete = models.DateTimeField(null=True, blank=True)

    def __str__(self):
        return self.id

    def set_password(self, raw_password):
        # self.password = make_password(raw_password)
        self.password = raw_password

    def check_password(self, raw_password):
        # return check_password(raw_password, self.password)
        return (self.password == raw_password)


class RoomUser(models.Model):
    room = models.ForeignKey(Room, on_delete=models.CASCADE)
    user = models.ForeignKey(User, on_delete=models.CASCADE)
    joined = models.DateTimeField(auto_now_add=True, editable=False, blank=True)
    soft_delete = models.DateTimeField(null=True, blank=True)

    def __str__(self):
        return str(self.room) + ' - ' + str(self.user)