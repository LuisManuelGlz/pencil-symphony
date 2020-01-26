import axios from 'axios';

import { setAlert } from './alert';
import {
  GET_PROFILE,
  GET_PROFILE_FAIL,
  CHANGE_UPDATE_PROFILE_MODE,
  UPDATE_PROFILE,
  UPDATE_PROFILE_FAIL,
  CLEAR_PROFILE
} from './actionTypes';

// import setAuthToken from '../../utils/setAuthToken';

export const getProfile = id => async dispatch => {
  try {
    const profile = await axios.get(`/profile/${id}`);
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
    const res = await axios.put(`/profile/edit`, profileData);
    dispatch(setAlert(res.data.success, 'success'));
    dispatch({ type: UPDATE_PROFILE, payload: res.data.profileUpdated });
  } catch (error) {
    const errors = error.response.data.errors;
    errors.map(error => dispatch(setAlert(error.msg, 'danger')));
    dispatch({ type: UPDATE_PROFILE_FAIL });
  }
};

export const clearProfile = () => dispatch => {
  dispatch({ type: CLEAR_PROFILE });
};

export const changeUpdateProfileMode = () => dispatch => {
  dispatch({ type: CHANGE_UPDATE_PROFILE_MODE });
};