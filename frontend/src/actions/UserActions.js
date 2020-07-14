import axios from 'axios';
import setAuthToken from '../utils/setAuthToken';
import { ON_USER_AUTH, ON_USER_AUTH_SUCCESS, ON_USER_AUTH_FAIL, ON_USER_LOGOUT } from './types';

export const onUserRead = () => async dispatch => {
  dispatch({ type: ON_USER_AUTH });

  if (localStorage.token) setAuthToken(localStorage.token);

  try {
    const res = await axios.get('/api/users/current-user/');
    dispatch({ type: ON_USER_AUTH_SUCCESS, payload: { username: res.data.username } });
  } catch (error) {
    dispatch(onUserLogout());
  }
}

export const onUserLogin = data => async dispatch => {
  // data = { username, password }
  dispatch({ type: ON_USER_AUTH });

  const config = { headers: { 'Content-Type': 'application/json' } };

  try {
    const res = await axios.post('/token-auth/', data, config);
    dispatch({ type: ON_USER_AUTH_SUCCESS, payload: { token: res.data.token, username: res.data.user.username } });
  } catch (error) {
    dispatch({ type: ON_USER_AUTH_FAIL });
  }
}

export const onUserCreate = data => async dispatch => {
  // data = { username, password }
  dispatch({ type: ON_USER_AUTH });

  const config = { headers: { 'Content-Type': 'application/json' } };

  try {
    const res = await axios.post('/api/users/', data, config);
    dispatch({ type: ON_USER_AUTH_SUCCESS, payload: { token: res.data.token, username: res.data.user.username } });
  } catch (error) {
    dispatch({ type: ON_USER_AUTH_FAIL });
  }
}

export const onUserLogout = () => dispatch => dispatch({ type: ON_USER_LOGOUT });