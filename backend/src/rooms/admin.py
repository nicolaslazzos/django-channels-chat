from django.contrib import admin
from django import forms
from django.forms import ModelForm, PasswordInput

from rooms.models import Room, RoomUser


class RoomForm(ModelForm):
    class Meta:
        model = Room
        fields = ['id', 'label', 'password', 'owner', 'soft_delete']
        widgets = {
            'password': PasswordInput(render_value=True),
        }


class RoomAdmin(admin.ModelAdmin):
    form = RoomForm


admin.site.register(Room, RoomAdmin)
admin.site.register(RoomUser)