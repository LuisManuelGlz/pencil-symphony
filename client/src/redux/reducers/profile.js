import {
  GET_PROFILE,
  GET_PROFILE_FAIL,
  UPDATE_PROFILE,
  UPDATE_PROFILE_FAIL,
  CLEAR_PROFILE
} from '../actions/actionTypes';

const initialState = {
  profile: null,
  isLoading: true
};

export default function(state = initialState, action) {
  const { type, payload } = action;

  switch (type) {
    case GET_PROFILE:
    case UPDATE_PROFILE:
      return {
        ...state,
        profile: payload,
        isLoading: false
      };
    case GET_PROFILE_FAIL:
    case UPDATE_PROFILE_FAIL:
      return {
        ...state,
        isLoading: false
      };
    case CLEAR_PROFILE:
      return {
        ...state,
        profile: null,
        isLoading: false
      }
    default:
      return state;
  }
}
