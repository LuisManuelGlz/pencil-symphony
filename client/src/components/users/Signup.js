import React, { Component } from 'react';
import { connect } from 'react-redux';
import { signup, cancelRedirect } from '../../redux/actions/users';
import { Link, Redirect } from 'react-router-dom';

class Signup extends Component {
  constructor(props) {
    super(props);
    this.state = {
      firstName: '',
      lastName: '',
      email: '',
      password: '',
      password2: ''
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
      firstName: this.state.firstName,
      lastName: this.state.lastName,
      email: this.state.email,
      password: this.state.password,
      password2: this.state.password2
    };

    this.props.signup(user);
  }

  render() {
    if (this.props.toLogin) {
      this.props.cancelRedirect();
      return <Redirect to="/login" />;
    }

    if (this.props.isAuthenticated) {
      return <Redirect to="/posts" />
    }

    return (
      <div>
        Signup
        <form onSubmit={this.handleSubmit}>
          <input
            type="text"
            className=""
            name="firstName"
            value={this.state.firstName}
            placeholder="First name"
            onChange={this.handleChange}
          />
          <input
            type="text"
            className=""
            name="lastName"
            value={this.state.lastName}
            placeholder="Last name"
            onChange={this.handleChange}
          />
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
            placeholder="Password"
            onChange={this.handleChange}
          />
          <input
            type="password"
            className=""
            name="password2"
            value={this.state.password2}
            placeholder="Confirm password"
            onChange={this.handleChange}
          />
          <button type="submit">Signup</button>
        </form>
        <Link to="/login">Login</Link>
      </div>
    );
  }
}

const mapStateToProps = state => ({
  toLogin: state.users.toLogin,
  isAuthenticated: state.auth.isAuthenticated
});

export default connect(mapStateToProps, { signup, cancelRedirect })(Signup);
