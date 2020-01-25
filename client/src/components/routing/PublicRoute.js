import React, { Component } from 'react';

import { connect } from 'react-redux';

import { Route, Redirect } from 'react-router-dom';

class PublicRoute extends Component {
  render() {
    const Component = this.props.component;
    return (
      <Route
        render={props =>
          this.props.isLoading ? (
            <div>Loading...</div>
          ) : this.props.isAuthenticated ? (
            <Redirect to="/posts" />
          ) : (
            <Component {...props} />
          )
        }
      />
    );
  }
}

const mapStateToProps = state => ({
  isAuthenticated: state.auth.isAuthenticated,
  isLoading: state.auth.isLoading
});

export default connect(mapStateToProps)(PublicRoute);
