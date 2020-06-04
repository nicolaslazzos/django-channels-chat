import ReconnectingWebSocket from 'reconnecting-websocket';
import { WS_ENDPOINT } from '../environment';
import { ON_MESSAGES_VALUE_CHANGE, ON_MESSAGES_READING, ON_MESSAGES_READ } from './types';

export const onMessagesValueChange = data => ({ type: ON_MESSAGES_VALUE_CHANGE, payload: data });

export const onRoomMessagesRead = roomId => dispatch => {
  dispatch({ type: ON_MESSAGES_READING });

  const socket = new ReconnectingWebSocket(`${WS_ENDPOINT()}/rooms/${roomId}/`);

  socket.onopen = event => console.log('WebSocket Connected');

  socket.onmessage = event => dispatch({ type: ON_MESSAGES_READ, payload: { messages: JSON.parse(event.data) } });

  socket.onclose = event => console.log('WebSocket Disconnected');

  return socket;
}