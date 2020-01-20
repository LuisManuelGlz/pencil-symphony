import React, { Component } from 'react';

import { connect } from 'react-redux';

class Alert extends Component {
  render() {
    if (this.props.success) {
      return (
        <div
          className="alert alert-success alert-dismissible fade show"
          role="alert"
        >
          {this.props.success}
          <button
            type="button"
            className="close"
            data-dismiss="alert"
            aria-label="Close"
          >
            <span aria-hidden="true">&times;</span>
          </button>
        </div>
      );
    }

    return this.props.errors.map((error, index) => {
      return (
        <div
          key={index}
          className="alert alert-danger alert-dismissible fade show"
          role="alert"
        >
          {error.msg}
          <button
            type="button"
            className="close"
            data-dismiss="alert"
            aria-label="Close"
          >
            <span aria-hidden="true">&times;</span>
          </button>
        </div>
      );
    });
  }
}

const mapStateToProps = state => ({
  success: state.alert.success,
  errors: state.alert.errors
});

export default connect(mapStateToProps)(Alert);
