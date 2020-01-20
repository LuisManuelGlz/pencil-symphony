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
        </div>
      );
    }

    return this.props.alerts.map(alert => {
      return (
        <div
          key={alert.id}
          className={`alert alert-${alert.typeAlert} alert-dismissible fade show`}
          role="alert"
        >
          {alert.msg}
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
  alerts: state.alert
});

export default connect(mapStateToProps)(Alert);
