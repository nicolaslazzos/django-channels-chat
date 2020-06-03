import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import MainScreen from './MainScreen';
import Login from './Login';
import { onUserRead } from '../actions';
import { BrowserRouter, Switch, Route, Redirect } from "react-router-dom";

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