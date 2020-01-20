import React, { Component, Fragment } from 'react';

import { connect } from 'react-redux';
import { updateAccount } from '../../redux/actions/users';

class UpdateAccount extends Component {
  constructor(props) {
    super(props);
    this.state = {
      updateAccountMode: false,
      newFirstName: '',
      newLastName: '',
      newEmail: ''
    };

    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleChange(e) {
    const { name, value } = e.target;
    this.setState({ [name]: value });
  }

  handleSubmit = async (e) => {
    e.preventDefault();

    const user = {
      newFirstName: this.state.newFirstName,
      newLastName: this.state.newLastName,
      newEmail: this.state.newEmail
    };

    await this.props.updateAccount(user);

    if (this.props.success) {
      this.setState({
        updateAccountMode: false,
        newFirstName: '',
        newLastName: '',
        newEmail: ''
      });
    }
  }

  render() {
    return (
      <div>
        <h2>Account settings</h2>
        <br />
        {this.state.updateAccountMode ? (
          <form onSubmit={this.handleSubmit}>
            <h5>Update account</h5>
            <hr />
            <div className="form-group">
              <input
                type="text"
                className="form-control"
                name="newFirstName"
                value={this.state.newFirstName}
                placeholder="First name"
                onChange={this.handleChange}
              />
            </div>
            <div className="form-group">
              <input
                type="text"
                className="form-control"
                name="newLastName"
                value={this.state.newLastName}
                placeholder="Last name"
                onChange={this.handleChange}
              />
            </div>
            <div className="form-group">
              <input
                type="email"
                className="form-control"
                name="newEmail"
                value={this.state.newEmail}
                placeholder="Email"
                onChange={this.handleChange}
              />
            </div>
            <div className="form-group">
              <button type="submit" className="btn btn-primary mr-2">
                Update account
              </button>
              <button
                className="btn"
                onClick={() => this.setState({ updateAccountMode: false })}
              >
                Cancel
              </button>
            </div>
          </form>
        ) : (
          <Fragment>
            <p>Update your account</p>
            <button
              className="btn btn-primary"
              onClick={() => this.setState({ updateAccountMode: true })}
            >
              Update account
            </button>
          </Fragment>
        )}
      </div>
    );
  }
}

const mapStateToProps = state => ({
  success: state.alert.success
});

export default connect(mapStateToProps, { updateAccount })(UpdateAccount);
