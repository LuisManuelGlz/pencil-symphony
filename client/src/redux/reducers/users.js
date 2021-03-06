import {
  SIGNUP_SUCCESS,
  SIGNUP_FAIL,
  LOGIN_LOADED,
  UPDATE_ACCOUNT,
  UPDATE_ACCOUNT_FAIL,
  CHANGE_PASSWORD,
  CHANGE_PASSWORD_FAIL
} from '../actions/actionTypes';

const initialState = {
  isLoading: true,
  toLogin: false
};

export default function(state = initialState, action) {
  const { type } = action;

  switch (type) {
    case LOGIN_LOADED:
    case SIGNUP_SUCCESS:
      return {
        ...state,
        isLoading: false,
        toLogin: false
      };
    case UPDATE_ACCOUNT:
    case CHANGE_PASSWORD:
    case SIGNUP_FAIL:
    case UPDATE_ACCOUNT_FAIL:
    case CHANGE_PASSWORD_FAIL:
      return {
        ...state,
        isLoading: false
      };
    default:
      return state;
  }
}
