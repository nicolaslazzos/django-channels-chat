import axios from 'axios';
import {
  ON_ROOMS_VALUE_CHANGE,
  ON_ROOM_READ,
  ON_ROOM_READING,
  ON_ROOM_READ_FAIL,
  ON_ROOM_CREATING,
  ON_ROOM_CREATED,
  ON_ROOM_CREATE_FAIL,
  ON_ROOM_DELETED,
} from './types';

export const onRoomsValueChange = data => ({ type: ON_ROOMS_VALUE_CHANGE, payload: data });

export const onRoomsRead = () => async dispatch => {
  dispatch({ type: ON_ROOM_READING });

  try {
    const res = await axios.get('/api/rooms/');
    dispatch({ type: ON_ROOM_READ, payload: { rooms: res.data } });
  } catch (error) {
    dispatch({ type: ON_ROOM_READ_FAIL });
  }
}

export const onRoomCreate = data => async dispatch => {
  // data = { id, label, password }
  dispatch({ type: ON_ROOM_CREATING });

  const config = { headers: { 'Content-Type': 'application/json' } };

  try {
    const res = await axios.post('/api/rooms/', data, config);
    dispatch({ type: ON_ROOM_CREATED, payload: { room: res.data } });
  } catch (error) {
    dispatch({ type: ON_ROOM_CREATE_FAIL, payload: error.response ? error.response.data : {} });
  }
}

export const onRoomJoin = data => async dispatch => {
  // data = { room, password }
  dispatch({ type: ON_ROOM_CREATING });

  const config = { headers: { 'Content-Type': 'application/json' } };

  try {
    const res = await axios.post('/api/rooms/join/', data, config);
    dispatch({ type: ON_ROOM_CREATED, payload: { room: res.data } });
  } catch (error) {
    dispatch({ type: ON_ROOM_CREATE_FAIL, payload: error.response ? error.response.data : {} });
  }
}

export const onRoomDelete = id => async dispatch => {
  const data = { soft_delete: new Date() };
  const config = { headers: { 'Content-Type': 'application/json' } };

  try {
    await axios.patch(`/api/rooms/${id}/`, data, config);
    dispatch({ type: ON_ROOM_DELETED, payload: { id } });
  } catch (error) {
    console.error(error);
  }
}

export const onRoomLeave = id => async dispatch => {
  const data = { soft_delete: new Date() };
  const config = { headers: { 'Content-Type': 'application/json' } };

  try {
    await axios.patch(`/api/rooms/leave/${id}/`, data, config);
    dispatch({ type: ON_ROOM_DELETED, payload: { id } });
  } catch (error) {
    console.error(error);
  }
}