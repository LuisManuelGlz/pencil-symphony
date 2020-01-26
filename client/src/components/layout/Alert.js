import React from 'react';

import { connect } from 'react-redux';

const Alert = ({ alerts }) => {
  return alerts.map(alert => {
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
};

const mapStateToProps = state => ({
  alerts: state.alert
});

export default connect(mapStateToProps)(Alert);
