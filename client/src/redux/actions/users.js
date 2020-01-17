import axios from 'axios';
import { setAlert } from './alert';
import { SIGNUP_SUCCESS, SIGNUP_FAIL, LOGIN_LOADED } from './actionTypes';

export const signup = user => async dispatch => {
  axios.defaults.headers.common['Content-Type'] = 'application/json';

  try {
    const res = await axios.post('/api/users/signup', user);
    dispatch({ type: SIGNUP_SUCCESS, payload: res.data });
  } catch (error) {
    const messages = error.response.data;
    dispatch(setAlert(messages));
    dispatch({ type: SIGNUP_FAIL });
  }
};

export const cancelRedirect = () => dispatch => {
  dispatch({ type: LOGIN_LOADED, payload: false });
};