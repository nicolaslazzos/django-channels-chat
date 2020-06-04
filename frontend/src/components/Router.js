import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import MainScreen from './MainScreen';
import Login from './Login';
import { onUserRead } from '../actions';
import { BrowserRouter, Switch, Route, Redirect } from "react-router-dom";

// const location = window.location

// let protocol = 'ws://'
// if (location.protocol === 'https:') {
//   protocol = 'wss://'
// }

// const endpoint = protocol + location.hostname + ':8000/rooms/private/'
// const socket = new WebSocket(endpoint)

// socket.onmessage = event => {
//   console.log('messages', JSON.parse(event.data))
// }

// socket.onopen = event => {
//   console.log('open', event)
// }

// socket.onerror = event => {
//   console.log('error', event)
// }

// socket.onclose = event => {
//   console.log('close', event)
// }

const Router = props => {
  useEffect(() => {
    if (props.loggedIn) props.onUserRead();
  }, []);

  return (
    <BrowserRouter>
      <Switch>
        <Route
          exact
          path="/"
          render={() => props.loggedIn ? <Redirect to="/rooms" /> : <Redirect to="/login" />}
        />
        <Route
          exact
          path="/rooms"
          render={() => props.loggedIn ? <MainScreen windowHeight={props.windowHeight} /> : <Redirect to="/login" />}
        />
        <Route
          path="/login"
          render={() => props.loggedIn ? <Redirect to="/rooms" /> : <Login />}
        />
      </Switch>
    </BrowserRouter>
  );
}

const mapStateToProps = state => {
  const { loggedIn } = state.user;
  return { loggedIn };
}

export default connect(mapStateToProps, { onUserRead })(Router);