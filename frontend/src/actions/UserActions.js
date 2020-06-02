import {
  ON_USER_VALUE_CHANGE,
  ON_USER_AUTH,
  ON_USER_AUTH_SUCCESS,
  ON_USER_AUTH_FAIL,
} from './types';

export const onUserValueChange = data => ({ type: ON_USER_VALUE_CHANGE, payload: data });

export const onUserRead = () => dispatch => {
  dispatch({ type: ON_USER_AUTH });

  fetch('http://localhost:8000/api/users/current-user/', {
    headers: {
      Authorization: `JWT ${localStorage.getItem('token')}`
    }
  })
    .then(res => res.json())
    .then(json => {
      dispatch({ type: ON_USER_AUTH_SUCCESS, payload: { username: json.username } });
    })
    .catch(error => dispatch({ type: ON_USER_AUTH_FAIL }));
}

export const onUserLogin = data => dispatch => {
  dispatch({ type: ON_USER_AUTH });

  fetch('http://localhost:8000/token-auth/', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(data)
  })
    .then(res => res.json())
    .then(json => {
      localStorage.setItem('token', json.token);
      dispatch({ type: ON_USER_AUTH_SUCCESS, payload: { username: json.user.username, loggedIn: true, password: '' } });
    })
    .catch(error => dispatch({ type: ON_USER_AUTH_FAIL, payload: { password: '' } }));
}

export const onUserCreate = data => dispatch => {
  dispatch({ type: ON_USER_AUTH });

  fetch('http://localhost:8000/api/users/', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(data)
  })
    .then(res => res.json())
    .then(json => {
      localStorage.setItem('token', json.token);
      dispatch({ type: ON_USER_AUTH_SUCCESS, payload: { username: json.username, loggedIn: true } });
    })
    .catch(error => dispatch({ type: ON_USER_AUTH_FAIL }));
}

export const onUserLogout = () => {
  localStorage.removeItem('token');
  return { type: ON_USER_VALUE_CHANGE, payload: { username: '', loggedIn: false } };
}