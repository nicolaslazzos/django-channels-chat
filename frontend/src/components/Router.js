import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import MainScreen from './MainScreen';
import Login from './Login';
import { onUserRead } from '../actions';
import { BrowserRouter, Switch, Route, Redirect } from "react-router-dom";

const Router = props => {
  const { user: { loggedIn, loading }, onUserRead, windowHeight } = props;

  useEffect(() => { loggedIn && onUserRead() }, [onUserRead, loggedIn]);

  return (
    <BrowserRouter>
      <Switch>
        <Route
          exact
          path="/"
          render={() => loggedIn && !loading ? <Redirect to="/rooms" /> : <Redirect to="/login" />}
        />
        <Route
          exact
          path="/rooms"
          render={() => loggedIn && !loading ? <MainScreen windowHeight={windowHeight} /> : <Redirect to="/login" />}
        />
        <Route
          path="/login"
          render={() => loggedIn && !loading ? <Redirect to="/rooms" /> : <Login />}
        />
      </Switch>
    </BrowserRouter>
  );
}

const mapStateToProps = state => {
  return { user: state.user };
}

export default connect(mapStateToProps, { onUserRead })(Router);