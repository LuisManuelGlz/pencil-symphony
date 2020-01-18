import React, { Component } from 'react';
import { Link, Redirect } from 'react-router-dom';

import { connect } from 'react-redux';

class Home extends Component {
  render() {
    if (this.props.isAuthenticated) {
      return <Redirect to="/posts" />
    }

    return (
      <div>
        <Link to='/signup'>Signup</Link>
        <Link to='/login'>Login</Link>
      </div>
    );
  }
}

const mapStateToProps = state => ({
  isAuthenticated: state.auth.isAuthenticated
});

export default connect(mapStateToProps)(Home);
