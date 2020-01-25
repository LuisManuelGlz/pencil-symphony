import axios from 'axios';
import { setAlert } from './alert';
import { loadUser } from './auth';
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
    const res = await axios.post('/users/signup', user);
    dispatch(setAlert(res.data.success, 'success'));
    dispatch({ type: SIGNUP_SUCCESS });
  } catch (error) {
    const errors = error.response.data.errors;
    errors.map(error => dispatch(setAlert(error.msg, 'danger')));
    dispatch({ type: SIGNUP_FAIL });
  }
};

export const cancelRedirect = () => dispatch => {
  dispatch({ type: LOGIN_LOADED, payload: false });
};

export const updateAccount = user => async dispatch => {
  axios.defaults.headers.common['Content-Type'] = 'application/json';
  
  if (localStorage.token) {
    setAuthToken(localStorage.token);
  }

  try {
    const res = await axios.put('/users/update-account', user);
    dispatch(setAlert(res.data.success, 'success'));
    dispatch(loadUser());
    dispatch({ type: UPDATE_ACCOUNT });
  } catch (error) {
    const errors = error.response.data.errors;
    errors.map(error => dispatch(setAlert(error.msg, 'danger')));
    dispatch({ type: UPDATE_ACCOUNT_FAIL });
  }
};

export const changePassword = passwordData => async dispatch => {
  axios.defaults.headers.common['Content-Type'] = 'application/json';

  try {
    const res = await axios.put('/users/change-password', passwordData);
    dispatch(setAlert(res.data.success, 'success'));
    dispatch({ type: CHANGE_PASSWORD });
  } catch (error) {
    const errors = error.response.data.errors;
    errors.map(error => dispatch(setAlert(error.msg, 'danger')));
    dispatch({ type: CHANGE_PASSWORD_FAIL });
  }
};
