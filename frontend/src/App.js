import React, { useState, useEffect } from 'react';
import { Row, Col, Empty } from 'antd';
import './App.css';
import Rooms from './components/Rooms';
import Chat from './components/Chat';
import MessageInput from './components/MessageInput';
import EmptyScreen from './components/EmptyScreen';
import Login from './components/Login';


import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect,
  useHistory,
} from "react-router-dom";

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
  const [height, setHeight] = useState(window.innerHeight);
  const [room, setRoom] = useState(false);
  let history = useHistory();

  const updateWindowDimensions = () => {
    setHeight(window.innerHeight)
  }

  const onRoomSelectToggle = () => setRoom(!room);

  window.addEventListener('resize', updateWindowDimensions);

  return (
    <div className="App" style={{ height }}>

      <Router>
        <Switch>
          <Route
            exact
            path="/"
          // render={() => false ? <Redirect to="/rooms" /> : <Redirect to="/login" />}
          />
          <Route
            exact
            path="/rooms"
            render={() => true ? (
              <Row>
                <Col span={6}>
                  <Rooms windowHeight={height} onRoomPress={onRoomSelectToggle} />
                </Col>
                <Col span={18} style={{ paddingLeft: 15 }}>
                  {room ? (
                    <div>
                      <Chat windowHeight={height} onClose={onRoomSelectToggle} />
                      <MessageInput />
                    </div>
                  ) : <EmptyScreen />}
                </Col>
              </Row>) : (
                <Redirect to="/login" />
              )}
          />
          <Route path="/login">
            <Login />
          </Route>
        </Switch>
      </Router>
    </div>
  );
}

export default App;
