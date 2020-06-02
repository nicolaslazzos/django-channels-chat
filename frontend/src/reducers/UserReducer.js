import {
  ON_USER_VALUE_CHANGE,
  ON_USER_AUTH,
  ON_USER_AUTH_SUCCESS,
  ON_USER_AUTH_FAIL
} from '../actions/types';

const INITIAL_STATE = {
  username: '',
  password: '',
  loggedIn: localStorage.getItem('token') ? true : false,
  loading: false,
  error: '',
};

export default (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case ON_USER_VALUE_CHANGE:
      return { ...state, ...action.payload };
    case ON_USER_AUTH:
      return { ...state, loading: true, error: '' };
    case ON_USER_AUTH_SUCCESS:
      return { ...state, ...action.payload, loading: false };
    case ON_USER_AUTH_FAIL:
      return { ...state, loading: false, ...action.payload };
    default:
      return state;
  }
};