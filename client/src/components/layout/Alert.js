import React, { Component } from 'react';

import { connect } from 'react-redux';

class Alert extends Component {
  render() {
    return this.props.alerts.map(alert => {
      return (
        <div
          key={alert.id}
          className={`alert alert-${alert.typeAlert} alert-dismissible fade show`}
          role="alert"
        >
          {alert.msg}
        </div>
      );
    });
  }
}

const mapStateToProps = state => ({
  alerts: state.alert
});

export default connect(mapStateToProps)(Alert);
