import axios from 'axios';

import { setAlert } from './alert';
import { GET_POSTS, GET_POSTS_FAIL } from './actionTypes';

export const getPosts = () => async dispatch => {
  try {
    const res = await axios.get('/posts');
    dispatch({ type: GET_POSTS, payload: res.data });
  } catch (error) {
    const errors = error.response.data.errors;
    errors.map(error => dispatch(setAlert(error.msg, 'danger')));
    dispatch({ type: GET_POSTS_FAIL });
  }
};