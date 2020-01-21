import axios from 'axios';

import { setAlert } from './alert';
import {
  GET_PROFILE,
  GET_PROFILE_FAIL,
  UPDATE_PROFILE,
  UPDATE_PROFILE_FAIL
} from './actionTypes';

// import setAuthToken from '../../utils/setAuthToken';

export const getProfile = id => async dispatch => {
  try {
    const profile = await axios.get(`/api/profile/${id}`);
    dispatch({ type: GET_PROFILE, payload: profile.data });
  } catch (error) {
    const errors = error.response.data.errors;
    errors.map(error => dispatch(setAlert(error.msg, 'danger')));
    dispatch({ type: GET_PROFILE_FAIL });
  }
};

export const updateProfile = profileData => async dispatch => {
  axios.defaults.headers.common['Content-Type'] = 'application/json';

  try {
    const res = await axios.put(`/api/profile/edit`, profileData);
    dispatch(setAlert(res.data.success, 'success'));
    dispatch({ type: UPDATE_PROFILE, payload: res.data.profileUpdated });
  } catch (error) {
    const errors = error.response.data.errors;
    errors.map(error => dispatch(setAlert(error.msg, 'danger')));
    dispatch({ type: UPDATE_PROFILE_FAIL });
  }
};
