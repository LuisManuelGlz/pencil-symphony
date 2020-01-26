import React, { useState, useEffect } from 'react';

import { clearAlerts } from '../../redux/actions/alert';
import { connect } from 'react-redux';
import { login } from '../../redux/actions/auth';

import { Link } from 'react-router-dom';

const Login = ({ clearAlerts, login }) => {
  const [formData, setFormData] = useState({ email: '', password: '' });

  const { email, password } = formData;

  useEffect(() => () => clearAlerts(), []);

  const handleChange = e => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = e => {
    e.preventDefault();

    const user = { email, password };

    login(user);
  };

  return (
    <div className="d-flex justify-content-center">
      <form onSubmit={e => handleSubmit(e)}>
        <h2 className="text-center">Log In</h2>
        <hr />
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
            placeholder="Pasword"
            onChange={e => handleChange(e)}
          />
        </div>
        <div className="form-group text-center">
          <button type="submit" className="btn btn-primary">
            Log In
          </button>
          <Link to="/signup" className="btn">
            Create acount
          </Link>
        </div>
      </form>
    </div>
  );
};

export default connect(null, { clearAlerts, login })(Login);
