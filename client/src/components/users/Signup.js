import React, { Component } from 'react';
import { Link } from 'react-router-dom';

class Signup extends Component {
  render() {
    return (
      <div>
        Signup
        <Link to="/login">Login</Link>
      </div>
    );
  }
}

export default Signup;
