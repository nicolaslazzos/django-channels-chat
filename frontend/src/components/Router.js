import React, { useState, useEffect } from 'react';
import { Row, Col } from 'antd';
import { connect } from 'react-redux';
import Rooms from './Rooms';
import Chat from './Chat';
import MessageInput from './MessageInput';
import EmptyScreen from './EmptyScreen';
import Login from './Login';
import { onUserRead } from '../actions';
import { BrowserRouter, Switch, Route, Redirect } from "react-router-dom";

const Router = props => {
  const [room, setRoom] = useState(false);

  useEffect(() => {
    if (props.loggedIn) props.onUserRead();
  }, []);

  const onRoomSelectToggle = () => setRoom(!room);

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
          render={() => props.loggedIn ? (
            <Row>
              <Col span={6}>
                <Rooms windowHeight={props.windowHeight} onRoomPress={onRoomSelectToggle} />
              </Col>
              <Col span={18} style={{ paddingLeft: 15 }}>
                {room ? (
                  <div>
                    <Chat windowHeight={props.windowHeight} onClose={onRoomSelectToggle} />
                    <MessageInput />
                  </div>
                ) : <EmptyScreen />}
              </Col>
            </Row>) : (
              <Redirect to="/login" />
            )}
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