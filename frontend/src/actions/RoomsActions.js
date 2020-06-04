import { BACKEND_HOST } from '../environment';
import {
  ON_ROOMS_VALUE_CHANGE,
  ON_ROOM_READ,
  ON_ROOM_READING,
  ON_ROOM_READ_FAIL,
  ON_ROOM_CREATING,
  ON_ROOM_CREATED,
  ON_ROOM_CREATE_FAIL,
} from './types';

export const onRoomsValueChange = data => ({ type: ON_ROOMS_VALUE_CHANGE, payload: data });

export const onRoomsRead = () => dispatch => {
  dispatch({ type: ON_ROOM_READING });

  fetch(`${BACKEND_HOST}/api/rooms/`, {
    headers: {
      Authorization: `JWT ${localStorage.getItem('token')}`
    }
  })
    .then(response => response.json())
    .then(data => dispatch({ type: ON_ROOM_READ, payload: { rooms: data } }))
    .catch(error => dispatch({ type: ON_ROOM_READ_FAIL }));
}

export const onRoomCreate = ({ id, label, password }) => dispatch => {
  dispatch({ type: ON_ROOM_CREATING });

  fetch(`${BACKEND_HOST}/api/rooms/`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `JWT ${localStorage.getItem('token')}`
    },
    body: JSON.stringify({ id, label, password }),
  })
    .then(response => response.json())
    .then(data => dispatch({ type: ON_ROOM_CREATED, payload: { room: data } }))
    .catch(error => dispatch({ type: ON_ROOM_CREATE_FAIL }));
}

export const onRoomJoin = ({ room, user, password }) => dispatch => {
  dispatch({ type: ON_ROOM_CREATING });

  fetch(`${BACKEND_HOST}/api/rooms/join/`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `JWT ${localStorage.getItem('token')}`
    },
    body: JSON.stringify({ room, user, password }),
  })
    .then(response => response.json())
    .then(data => dispatch({ type: ON_ROOM_CREATED, payload: { room: data } }))
    .catch(error => dispatch({ type: ON_ROOM_CREATE_FAIL }));
}