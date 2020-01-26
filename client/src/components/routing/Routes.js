import React, { Fragment } from 'react';

import { Switch, Route } from 'react-router-dom';

import Alert from '../layout/Alert';
import Home from '../layout/Home';
import Signup from '../users/Signup';
import Login from '../auth/Login';
import Posts from '../posts/Posts';
import Post from '../posts/Post';
import Account from '../users/Account';
import MyProfile from '../profile/MyProfile';
import Profile from '../profile/Profile';
import PublicRoute from './PublicRoute';
import PrivateRoute from './PrivateRoute';
import NotFound from '../layout/NotFound';

const Routes = () => {
  return (
    <Fragment>
      <Alert />
      <Switch>
        <PublicRoute exact path="/" component={Home} />
        <PublicRoute exact path="/signup" component={Signup} />
        <PublicRoute exact path="/login" component={Login} />
        <PrivateRoute exact path="/posts" component={Posts} />
        <PrivateRoute exact path="/posts/:id" component={Post} />
        <PrivateRoute exact path="/account" component={Account} />
        <PrivateRoute exact path="/me" component={MyProfile} />
        <PrivateRoute exact path="/profile/:id" component={Profile} />
        <Route component={NotFound} />
      </Switch>
    </Fragment>
  );
};

export default Routes;
