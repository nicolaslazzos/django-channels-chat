import {
  ON_ROOMS_VALUE_CHANGE,
  ON_ROOM_READING,
  ON_ROOM_READ,
  ON_ROOM_READ_FAIL,
  ON_ROOM_CREATING,
  ON_ROOM_CREATED,
  ON_ROOM_CREATE_FAIL,
  ON_ROOM_DELETED,
} from '../actions/types';

const INITIAL_STATE = {
  rooms: [],
  loading: false,
  error: {},
  newRoomVisible: false,
};

export default (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case ON_ROOMS_VALUE_CHANGE:
      return { ...state, ...action.payload };
    case ON_ROOM_READING:
      return { ...state, loading: true, error: {} };
    case ON_ROOM_READ:
      return { ...state, ...action.payload, loading: false, error: {} };
    case ON_ROOM_READ_FAIL:
      return { ...state, loading: false };
    case ON_ROOM_CREATING:
      return { ...state, loading: true, error: {} };
    case ON_ROOM_CREATED:
      return { ...state, loading: false, newRoomVisible: false, rooms: [...state.rooms, action.payload.room] };
    case ON_ROOM_CREATE_FAIL:
      return { ...state, loading: false, error: action.payload };
    case ON_ROOM_DELETED:
      return { ...state, rooms: state.rooms.filter(room => room.id !== action.payload.id) };
    default:
      return state;
  }
};