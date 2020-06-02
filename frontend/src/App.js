import React, { useState, useEffect } from 'react';
import { Provider } from 'react-redux';
import './App.css';
import store from './reducers';
import Router from './components/Router';

const location = window.location

let protocol = 'ws://'
if (location.protocol === 'https:') {
  protocol = 'wss://'
}

const endpoint = protocol + location.hostname + ':8000/api/messages/private/'
const socket = new WebSocket(endpoint)

socket.onmessage = event => {
  console.log('messages', JSON.parse(event.data))
}

socket.onopen = event => {
  console.log('open', event)
}

socket.onerror = event => {
  console.log('error', event)
}

socket.onclose = event => {
  console.log('close', event)
}

const App = () => {
  const [windowHeight, setWindowHeight] = useState(window.innerHeight);

  useEffect(() => window.addEventListener('resize', updateWindowDimensions), []);

  const updateWindowDimensions = () => setWindowHeight(window.innerHeight);

  return (
    <div className="App" style={{ height: windowHeight }}>
      <Provider store={store}>
        <Router windowHeight={windowHeight} />
      </Provider>
    </div>
  );
}

export default App;
