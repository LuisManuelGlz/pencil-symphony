import React, { Component } from 'react';
import { Link, Redirect } from 'react-router-dom';

import { connect } from 'react-redux';

class Home extends Component {
  render() {
    if (this.props.isAuthenticated) {
      return <Redirect to="/posts" />
    }

    return (
      <div className="text-center">
        <h2>Welcome to Pencil Symphony</h2>
        <Link to='/login' className="btn">Log In</Link>
      </div>
    );
  }
}

const mapStateToProps = state => ({
  isAuthenticated: state.auth.isAuthenticated
});

export default connect(mapStateToProps)(Home);
