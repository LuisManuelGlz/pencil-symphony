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

    return (
      <div className="d-flex justify-content-center">
        <form onSubmit={this.handleSubmit}>
          <h2 className="text-center">Sign Up</h2>
          <hr />
          <div className="form-group">
            <input
              type="text"
              className="form-control"
              name="firstName"
              value={this.state.firstName}
              placeholder="First name"
              onChange={this.handleChange}
            />
          </div>
          <div className="form-group">
            <input
              type="text"
              className="form-control"
              name="lastName"
              value={this.state.lastName}
              placeholder="Last name"
              onChange={this.handleChange}
            />
          </div>
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
              placeholder="Password"
              onChange={this.handleChange}
            />
          </div>
          <div className="form-group">
            <input
              type="password"
              className="form-control"
              name="password2"
              value={this.state.password2}
              placeholder="Confirm your password"
              onChange={this.handleChange}
            />
          </div>
          <div className="form-group text-center">
            <button type="submit" className="btn btn-primary mr-2">Sign Up</button>
            <Link to="/login" className="btn">I already have an account</Link>
          </div>
        </form>
      </div>
    );
  }
}

const mapStateToProps = state => ({
  toLogin: state.users.toLogin
});

export default connect(mapStateToProps, { signup, cancelRedirect })(Signup);
