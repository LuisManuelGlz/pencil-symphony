import { SET_SUCCESS_ALERT, SET_ERROR_ALERT } from '../actions/actionTypes';

export const setSuccessAlert = messages => dispatch =>
  dispatch({ type: SET_SUCCESS_ALERT, payload: messages });

export const setErrorAlert = messages => dispatch =>
  dispatch({ type: SET_ERROR_ALERT, payload: messages });
