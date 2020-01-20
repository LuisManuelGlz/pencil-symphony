import axios from 'axios';
import { setSuccessAlert, setErrorAlert } from './alert';
import { updateUser } from './auth';
import {
  SIGNUP_SUCCESS,
  SIGNUP_FAIL,
  LOGIN_LOADED,
  UPDATE_ACCOUNT,
  UPDATE_ACCOUNT_FAIL,
  CHANGE_PASSWORD,
  CHANGE_PASSWORD_FAIL
} from './actionTypes';

import setAuthToken from '../../utils/setAuthToken';

export const signup = user => async dispatch => {
  axios.defaults.headers.common['Content-Type'] = 'application/json';

  try {
    await axios.post('/api/users/signup', user);
    dispatch({ type: SIGNUP_SUCCESS });
  } catch (error) {
    const messages = error.response.data.errors;
    dispatch(setErrorAlert(messages));
    dispatch({ type: SIGNUP_FAIL });
  }
};

export const cancelRedirect = () => dispatch => {
  dispatch({ type: LOGIN_LOADED, payload: false });
};

export const updateAccount = user => async dispatch => {
  if (localStorage.token) {
    setAuthToken(localStorage.token);
  }

  axios.defaults.headers.common['Content-Type'] = 'application/json';

  try {
    const res = await axios.put('/api/users/update-account', user);
    dispatch(setSuccessAlert(res.data));
    dispatch(updateUser(res.data.userUpdated));
    dispatch({ type: UPDATE_ACCOUNT });
  } catch (error) {
    const messages = error.response.data.errors;
    dispatch(setErrorAlert(messages));
    dispatch({ type: UPDATE_ACCOUNT_FAIL });
  }
};

export const changePassword = passwordData => async dispatch => {
  if (localStorage.token) {
    setAuthToken(localStorage.token);
  }

  axios.defaults.headers.common['Content-Type'] = 'application/json';

  try {
    const res = await axios.put('/api/users/change-password', passwordData);
    console.log(res);
  } catch (error) {
    const messages = error.response.data.errors;
    dispatch(setErrorAlert(messages));
    dispatch({ type: CHANGE_PASSWORD_FAIL });
  }
};
