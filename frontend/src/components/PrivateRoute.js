import React from 'react';
import PropTypes from 'prop-types';
import { Route, Redirect } from 'react-router-dom';
import { connect } from 'react-redux';

const PrivateRoute = props => {
  const { component: Component, user, ...rest } = props;

  return (
    <Route
      {...rest}
      render={props => {
        return !user.loggedIn && !user.loading ? <Redirect to='/login' /> : <Component {...props} />
      }}
    />
  );
}

PrivateRoute.propTypes = {
  user: PropTypes.object.isRequired
}

const mapStateToProps = state => {
  return { user: state.user };
}

export default connect(mapStateToProps)(PrivateRoute);