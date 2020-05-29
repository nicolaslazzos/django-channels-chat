import React from 'react';
import logo from './logo.svg';
import './App.css';
import Chat from './components/Chat';

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

function App() {
  return (
    <div className="App">
      {/* <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          Edit <code>src/App.js</code> and save to reload.
        </p>
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React
        </a>
      </header> */}
      <Chat />
    </div>
  );
}

export default App;
