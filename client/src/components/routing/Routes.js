import React, { Component } from 'react';
import { Switch, Route } from 'react-router-dom';

import Home from '../layout/Home';
import Signup from '../users/Signup';
import Login from '../auth/Login';
import Posts from '../posts/Posts';
import Post from '../posts/Post';
import Acount from '../users/Acount';
import Profile from '../profile/Profile';
import EditProfile from '../profile/EditProfile';
import NotFound from '../layout/NotFound';

class Routes extends Component {
  render() {
    return (
      <Switch>
        <Route exact path="/" component={Home} />
        <Route exact path="/signup" component={Signup} />
        <Route exact path="/login" component={Login} />
        <Route exact path="/posts" component={Posts} />
        <Route exact path="/posts/:id" component={Post} />
        <Route exact path="/acount" component={Acount} />
        <Route exact path="/profile" component={Profile} />
        <Route exact path="/edit-profile" component={EditProfile} />
        <Route component={NotFound} />
      </Switch>
    
    );
  }
}

export default Routes;
