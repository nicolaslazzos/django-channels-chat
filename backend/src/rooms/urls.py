from django.urls import path

from rooms.views import RoomCreateListAPIView, RoomRetrieveUpdateDestroyAPIView, RoomUserCreateAPIView, RoomLeaveAPIView


urlpatterns = [
    path('', RoomCreateListAPIView.as_view(), name='rooms-list-create'),
    path('join/', RoomUserCreateAPIView.as_view(), name='room-join'),
    path('leave/<id>/', RoomLeaveAPIView.as_view(), name='room-leave'),
    path('<id>/', RoomRetrieveUpdateDestroyAPIView.as_view(), name='room-retrieve-update-destroy'),
]