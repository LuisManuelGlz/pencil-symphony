import uuid from 'uuid';
import { SET_ALERT, REMOVE_ALERT, CLEAR_ALERTS } from '../actions/actionTypes';

let timeouts = [];

export const setAlert = (msg, typeAlert) => dispatch => {
  const id = uuid.v4();
  dispatch({ type: SET_ALERT, payload: { msg, typeAlert, id } });
  timeouts.push(
    setTimeout(() => dispatch({ type: REMOVE_ALERT, payload: id }), 5000)
  );
};

export const clearAlerts = () => dispatch => {
  timeouts.map(timeout => clearTimeout(timeout));
  dispatch({ type: CLEAR_ALERTS });
};
