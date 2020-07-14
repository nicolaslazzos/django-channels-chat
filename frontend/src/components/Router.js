import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import MainScreen from './MainScreen';
import Login from './Login';
import { BrowserRouter, Switch, Route, Redirect } from "react-router-dom";

const Router = props => {
  const { user: { loggedIn, loading }, windowHeight } = props;

  const isLoggedIn = () => loggedIn && !loading

  return (
    <BrowserRouter>
      <Switch>
        <Route
          exact
          path="/"
          render={() => !isLoggedIn() ? <Redirect to="/login" /> : <Redirect to="/rooms" />}
        />
        <Route
          exact
          path="/rooms"
          render={() => !isLoggedIn() ? <Redirect to="/login" /> : <MainScreen windowHeight={windowHeight} />}
        />
        <Route
          path="/login"
          render={() => !isLoggedIn() ? <Login /> : <Redirect to="/rooms" />}
        />
      </Switch>
    </BrowserRouter>
  );
}

Router.propTypes = {
  user: PropTypes.object.isRequired,
  windowHeight: PropTypes.number
}

const mapStateToProps = state => {
  return { user: state.user };
}

export default connect(mapStateToProps)(Router);