import {
  GET_PROFILE,
  GET_PROFILE_FAIL,
  CHANGE_UPDATE_PROFILE_MODE,
  UPDATE_PROFILE,
  UPDATE_PROFILE_FAIL,
  CLEAR_PROFILE
} from '../actions/actionTypes';

const initialState = {
  profile: null,
  isProfileUpdatedSuccessfully: null,
  isLoading: true
};

export default function(state = initialState, action) {
  const { type, payload } = action;

  switch (type) {
    case GET_PROFILE:
      return {
        ...state,
        profile: payload,
        isLoading: false
      };
    case UPDATE_PROFILE:
      return {
        ...state,
        profile: payload,
        isProfileUpdatedSuccessfully: true,
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
    case CHANGE_UPDATE_PROFILE_MODE:
      return {
        ...state,
        isProfileUpdatedSuccessfully: null,
      };
    default:
      return state;
  }
}
