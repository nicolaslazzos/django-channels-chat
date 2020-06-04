from django.urls import path

from rooms.views import RoomCreateListAPIView, RoomRetrieveUpdateDestroyAPIView, RoomUserCreateAPIView, RoomUserRetrieveUpdateDestroyAPIView


urlpatterns = [
    path('', RoomCreateListAPIView.as_view(), name='rooms-list-create'),
    path('join/', RoomUserCreateAPIView.as_view(), name='room-join'),
    path('joined/<id>/', RoomUserRetrieveUpdateDestroyAPIView.as_view(), name='room-retrieve-update-destroy'),
    path('<id>/', RoomRetrieveUpdateDestroyAPIView.as_view(), name='room-retrieve-update-destroy'),
]