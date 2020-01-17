import axios from 'axios';
import { SIGNUP_SUCCESS, SIGNUP_FAIL } from './types';

export const register = ({
  firstName,
  lastName,
  email,
  password,
  password2
}) => dispatch => {
  axios.defaults.headers.common['Content-Type'] = 'application/json';

  const body = {
    firstName,
    lastName,
    email,
    password,
    password2
  };

  try {
    const res = axios.post('/api/users/signup', body);

    dispatch({ type: SIGNUP_SUCCESS, payload: res.data });
  } catch (error) {
    
  }
};
