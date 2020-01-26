import React from 'react';

import { connect } from 'react-redux';

import { Route, Redirect } from 'react-router-dom';

const PublicRoute = ({
  component: Component,
  auth: { isAuthenticated, isLoading }
}) => {
  return (
    <Route
      render={props =>
        isLoading ? (
          <div>Loading...</div>
        ) : isAuthenticated ? (
          <Redirect to="/posts" />
        ) : (
          <Component {...props} />
        )
      }
    />
  );
};

const mapStateToProps = state => ({
  auth: state.auth
});

export default connect(mapStateToProps)(PublicRoute);
