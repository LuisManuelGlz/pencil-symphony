import React, { Component } from 'react';
import { connect } from 'react-redux';
import { login } from '../../redux/actions/auth';
import { Link } from 'react-router-dom';

class Login extends Component {
  constructor(props) {
    super(props);
    this.state = {
      email: '',
      password: ''
    };

    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleChange(e) {
    const { name, value } = e.target;

    this.setState({ [name]: value });
  }

  handleSubmit(e) {
    e.preventDefault();

    const user = {
      email: this.state.email,
      password: this.state.password
    }

    this.props.login(user);
  }

  render() {
    return (
      <div className="d-flex justify-content-center">
        <form onSubmit={this.handleSubmit}>
          <h2 className="text-center">Log In</h2>
          <hr />
          <div className="form-group">
            <input
              type="email"
              className="form-control"
              name="email"
              value={this.state.email}
              placeholder="Email"
              onChange={this.handleChange}
            />
          </div>
          <div className="form-group">
            <input
              type="password"
              className="form-control"
              name="password"
              value={this.state.password}
              placeholder="Pasword"
              onChange={this.handleChange}
            />
          </div>
          <div className="form-group text-center">
            <button type="submit" className="btn btn-primary">Log In</button>
            <Link to="/signup" className="btn">Create acount</Link>
          </div>
        </form>
      </div>
    );
  }
}

export default connect(null, { login })(Login);
