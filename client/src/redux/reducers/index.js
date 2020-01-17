import { combineReducers } from 'redux';

import alert from './alert';
import users from './users';
import auth from './auth';

export default combineReducers({
  alert,
  users,
  auth
});