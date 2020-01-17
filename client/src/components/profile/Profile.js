import React, { Component } from 'react';
import { Link } from 'react-router-dom';

class Profile extends Component {
  render() {
    return (
      <div>
        Profile
        <Link to="/edit-profile">Edit profile</Link>
      </div>
    );
  }
}

export default Profile;
