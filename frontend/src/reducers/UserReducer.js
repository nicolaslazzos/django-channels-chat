import setAuthToken from '../utils/setAuthToken';
import {
  ON_USER_AUTH,
  ON_USER_AUTH_SUCCESS,
  ON_USER_AUTH_FAIL,
  ON_USER_LOGOUT
} from '../actions/types';

const INITIAL_STATE = {
  username: '',
  loggedIn: false,
  loading: false,
  error: null,
};

export default (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case ON_USER_AUTH:
      return { ...state, loading: true, error: null };
    case ON_USER_AUTH_SUCCESS:
      action.payload.token && setAuthToken(action.payload.token);
      return { ...state, username: action.payload.username, loggedIn: true, loading: false };
    case ON_USER_AUTH_FAIL:
      return { ...state, loading: false };
    case ON_USER_LOGOUT:
      setAuthToken(null);
      return INITIAL_STATE;
    default:
      return state;
  }
};