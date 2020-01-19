import React, { Component } from 'react';

class ChangePassword extends Component {
  constructor(props) {
    super(props);
    this.state = {
      oldPassword: '',
      newPassword: '',
      newPassword2: '',
    };

    this.handleChange = this.handleChange.bind(this);
  }

  handleChange(e) {
    const { name, value } = e.target;
    this.setState({ [name]: value });
  }

  render() {
    return (
      <div>
        <h2>Change your password</h2>
        <hr />
        <form>
          <div className="form-group">
            <input
              type="password"
              className="form-control"
              name="oldPassword"
              value={this.state.oldPassword}
              placeholder="Old password"
              onChange={this.handleChange}
            />
          </div>
          <div className="form-group">
            <input
              type="password"
              className="form-control"
              name="newPassword"
              value={this.state.newPassword}
              placeholder="New password"
              onChange={this.handleChange}
            />
          </div>
          <div className="form-group">
            <input
              type="password"
              className="form-control"
              name="newPassword2"
              value={this.state.newPassword2}
              placeholder="Confirm your password"
              onChange={this.handleChange}
            />
          </div>
          <div className="form-group">
            <button type="submit" className="btn btn-primary">
              Change password
            </button>
          </div>
        </form>
      </div>
    );
  }
}

export default ChangePassword;
