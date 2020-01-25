import React, { Component } from 'react';
import { Link } from 'react-router-dom';

import { connect } from 'react-redux';

class Home extends Component {
  render() {
    return (
      <div className="text-center">
        <h2>Welcome to Pencil Symphony</h2>
        <Link to='/login' className="btn">Log In</Link>
      </div>
    );
  }
}

export default connect(null)(Home);
