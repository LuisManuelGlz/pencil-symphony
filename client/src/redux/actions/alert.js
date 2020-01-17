import { SET_ALERT } from '../actions/actionTypes';

export const setAlert = messages => dispatch =>
  dispatch({ type: SET_ALERT, payload: messages });
