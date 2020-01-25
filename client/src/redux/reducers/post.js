import { GET_POSTS, GET_POSTS_FAIL } from '../actions/actionTypes';

const initialState = {
  posts: null,
  isLoading: true
};

export default function(state = initialState, action) {
  const { type, payload } = action;
  
  switch (type) {
    case GET_POSTS:
      return {
        ...state,
        posts: payload,
        isLoading: false
      };
    case GET_POSTS_FAIL:
      return {
        ...state,
        isLoading: false
      };
    default:
      return state;
  }
}
