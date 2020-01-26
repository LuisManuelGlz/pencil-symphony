import React, { useState } from 'react';
import { connect } from 'react-redux';
import { login } from '../../redux/actions/auth';
import { Link } from 'react-router-dom';

const Login = ({ login }) => {
  const [formData, setFormData] = useState({ email: '', password: '' });

  const { email, password } = formData;

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

export default connect(null, { login })(Login);
