import React, { Component } from 'react';
import { Switch, Route, Redirect } from 'react-router-dom';

import { connect } from 'react-redux';

import Home from '../layout/Home';
import Signup from '../users/Signup';
import Login from '../auth/Login';
import Posts from '../posts/Posts';
import Post from '../posts/Post';
import Acount from '../users/Acount';
import Profile from '../profile/Profile';
import EditProfile from '../profile/EditProfile';
import PrivateRoute from './PrivateRoute'
import NotFound from '../layout/NotFound';

class Routes extends Component {
  render() {
    return (
      <Switch>
        <Route exact path="/" component={Home} />
        <Route exact path="/signup" component={Signup} />
        <Route exact path="/login" component={Login} />
        <PrivateRoute exact path="/posts" component={Posts} />
        <PrivateRoute exact path="/posts/:id" component={Post} />
        <PrivateRoute exact path="/acount" component={Acount} />
        <PrivateRoute exact path="/profile" component={Profile} />
        <PrivateRoute exact path="/edit-profile" component={EditProfile} />
        <Route component={NotFound} />
      </Switch>
    );
  }
}

const mapStateToProps = state => ({
  isAuthenticated: state.auth.isAuthenticated,
  isLoading: state.auth.isLoading
});

export default connect(mapStateToProps)(Routes);
