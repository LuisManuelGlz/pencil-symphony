import { SET_SUCCESS_ALERT, SET_ERROR_ALERT } from '../actions/actionTypes';

const initialState = {
  success: '',
  errors: []
};

export default function(state = initialState, action) {
  const { type, payload } = action;

  switch (type) {
    case SET_SUCCESS_ALERT:
      return { ...state, ...payload };
    case SET_ERROR_ALERT:
      return { ...state, errors: payload };
    default:
      return state;
  }
}
