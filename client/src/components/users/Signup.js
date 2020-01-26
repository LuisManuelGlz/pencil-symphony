import React, { useState, useEffect } from 'react';

import { clearAlerts } from '../../redux/actions/alert';
import { connect } from 'react-redux';
import { signup, cancelRedirect } from '../../redux/actions/users';

import { Link, Redirect } from 'react-router-dom';

const Signup = ({ clearAlerts, signup, cancelRedirect, toLogin }) => {
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    password: '',
    password2: ''
  });

  const { firstName, lastName, email, password, password2 } = formData;

  useEffect(() => () => clearAlerts(), []);

  const handleChange = e => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = e => {
    e.preventDefault();

    const user = { firstName, lastName, email, password, password2 };

    signup(user);
  };

  if (toLogin) {
    cancelRedirect();
    return <Redirect to="/login" />;
  }

  return (
    <div className="d-flex justify-content-center">
      <form onSubmit={e => handleSubmit(e)}>
        <h2 className="text-center">Sign Up</h2>
        <hr />
        <div className="form-group">
          <input
            type="text"
            className="form-control"
            name="firstName"
            value={firstName}
            placeholder="First name"
            onChange={e => handleChange(e)}
          />
        </div>
        <div className="form-group">
          <input
            type="text"
            className="form-control"
            name="lastName"
            value={lastName}
            placeholder="Last name"
            onChange={e => handleChange(e)}
          />
        </div>
        <div className="form-group">
          <input
            type="email"
            className="form-control"
            name="email"
            value={email}
            placeholder="Email"
            onChange={e => handleChange(e)}
          />
        </div>
        <div className="form-group">
          <input
            type="password"
            className="form-control"
            name="password"
            value={password}
            placeholder="Password"
            onChange={e => handleChange(e)}
          />
        </div>
        <div className="form-group">
          <input
            type="password"
            className="form-control"
            name="password2"
            value={password2}
            placeholder="Confirm your password"
            onChange={e => handleChange(e)}
          />
        </div>
        <div className="form-group text-center">
          <button type="submit" className="btn btn-primary mr-2">
            Sign Up
          </button>
          <Link to="/login" className="btn">
            I already have an account
          </Link>
        </div>
      </form>
    </div>
  );
};

const mapStateToProps = state => ({
  toLogin: state.users.toLogin
});

export default connect(mapStateToProps, { clearAlerts, signup, cancelRedirect })(Signup);
