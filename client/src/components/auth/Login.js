import React, { Component } from 'react';
import { connect } from 'react-redux';
import { login } from '../../redux/actions/auth';
import { Link, Redirect } from 'react-router-dom';

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
    if (this.props.isAuthenticated) {
      return <Redirect to="/posts" />
    }

    return (
      <div>
        Login
        <form onSubmit={this.handleSubmit}>
          <input
            type="email"
            className=""
            name="email"
            value={this.state.email}
            placeholder="Email"
            onChange={this.handleChange}
          />
          <input
            type="password"
            className=""
            name="password"
            value={this.state.password}
            placeholder="Pasword"
            onChange={this.handleChange}
          />
          <button type="submit">Login</button>
        </form>
        <Link to="/signup">Signup</Link>
      </div>
    );
  }
}

const mapStateToProps = state => ({
  isAuthenticated: state.auth.isAuthenticated
});

export default connect(mapStateToProps, { login })(Login);
