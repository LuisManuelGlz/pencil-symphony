import {
  GET_PROFILE,
  GET_PROFILE_FAIL,
  UPDATE_PROFILE,
  UPDATE_PROFILE_FAIL
} from '../actions/actionTypes';

const initialState = {
  profile: {
    user: {}
  },
  profileExist: null,
  isLoading: true
};

export default function(state = initialState, action) {
  const { type, payload } = action;

  switch (type) {
    case GET_PROFILE:
      return {
        ...state,
        profileExist: true,
        profile: payload,
        isLoading: false
      };
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
    default:
      return state;
  }
}
