import axios from 'axios';
import { setAlert } from './alert';
import { USER_LOADED, AUTH_ERROR, LOGIN_SUCCESS, LOGIN_FAIL, LOGOUT } from './actionTypes';

export const loadUser = () => async dispatch => {
  if (localStorage.token) {
    axios.defaults.headers.common['x-access-token'] = `Bearer ${localStorage.token}`;
  } else {
    delete axios.defaults.headers.common['x-access-token'];
  }

  try {
    const res = await axios.get('/api/auth/test-auth');
    dispatch({ type: USER_LOADED, payload: res.data });
  } catch (error) {
    const messages = error.response.data;
    dispatch(setAlert(messages));
    dispatch({ type: AUTH_ERROR });
  }
};

export const login = user => async dispatch => {
  axios.defaults.headers.common['Content-Type'] = 'application/json';

  try {
    const res = await axios.post('/api/auth/login', user);
    dispatch({ type: LOGIN_SUCCESS, payload: res.data });
  } catch (error) {
    const messages = error.response.data;
    dispatch(setAlert(messages));
    dispatch({ type: LOGIN_FAIL });
  }
};

export const logout = () => dispatch => {
  dispatch({ type: LOGOUT });
};