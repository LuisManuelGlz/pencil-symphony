import React, { Fragment, useState, useEffect } from 'react';

import { connect } from 'react-redux';
import { clearAlerts } from '../../redux/actions/alert';
import { updateAccount } from '../../redux/actions/users';

const UpdateAccount = ({ alerts, clearAlerts, updateAccount }) => {
  const [updateAccountMode, setUpdateAccountMode] = useState(false);
  const [formData, setFormData] = useState({
    newFirstName: '',
    newLastName: '',
    newEmail: ''
  });

  const { newFirstName, newLastName, newEmail } = formData;

  useEffect(() => () => {
    console.log(alerts.length);
    if (alerts.length > 0) {
      clearAlerts()
    }
  }, []);

  const handleChange = e => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async e => {
    e.preventDefault();

    const user = {
      newFirstName,
      newLastName,
      newEmail
    };

    await updateAccount(user);

    // if (alerts[0].typeAlert === 'success') {
    //   setFormData({
    //     updateAccountMode: false,
    //     newFirstName: '',
    //     newLastName: '',
    //     newEmail: ''
    //   });
    // }
  };

  return (
    <div>
      <h2>Account settings</h2>
      <br />
      {updateAccountMode ? (
        <form onSubmit={e => handleSubmit(e)}>
          <h5>Update account</h5>
          <hr />
          <div className="form-group">
            <input
              type="text"
              className="form-control"
              name="newFirstName"
              value={newFirstName}
              placeholder="First name"
              onChange={e => handleChange(e)}
            />
          </div>
          <div className="form-group">
            <input
              type="text"
              className="form-control"
              name="newLastName"
              value={newLastName}
              placeholder="Last name"
              onChange={e => handleChange(e)}
            />
          </div>
          <div className="form-group">
            <input
              type="email"
              className="form-control"
              name="newEmail"
              value={newEmail}
              placeholder="Email"
              onChange={e => handleChange(e)}
            />
          </div>
          <div className="form-group">
            <button type="submit" className="btn btn-primary mr-2">
              Update account
            </button>
            <button className="btn" onClick={() => setUpdateAccountMode(false)}>
              Cancel
            </button>
          </div>
        </form>
      ) : (
        <Fragment>
          <p>Update your account</p>
          <button
            className="btn btn-primary"
            onClick={() => setUpdateAccountMode(true)}
          >
            Update account
          </button>
        </Fragment>
      )}
    </div>
  );
};

const mapStateToProps = state => ({
  alerts: state.alert
});

export default connect(mapStateToProps, { clearAlerts, updateAccount })(UpdateAccount);
