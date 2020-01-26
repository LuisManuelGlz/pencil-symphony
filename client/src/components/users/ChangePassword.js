import React, { useState, useEffect } from 'react';

import { connect } from 'react-redux';
import { clearAlerts } from '../../redux/actions/alert'
import { changePassword } from '../../redux/actions/users';

const ChangePassword = ({ clearAlerts, changePassword }) => {
  const [formData, setFormData] = useState({
    oldPassword: '',
    newPassword: '',
    newPassword2: ''
  });

  const { oldPassword, newPassword, newPassword2 } = formData;

  useEffect(() => () => clearAlerts(), []);

  const handleChange = e => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = e => {
    e.preventDefault();

    const passwordData = {
      oldPassword,
      newPassword,
      newPassword2
    };

    changePassword(passwordData);

    setFormData({
      oldPassword: '',
      newPassword: '',
      newPassword2: ''
    });
  };

  return (
    <div>
      <h2>Change your password</h2>
      <hr />
      <form onSubmit={e => handleSubmit(e)}>
        <div className="form-group">
          <input
            type="password"
            className="form-control"
            name="oldPassword"
            value={oldPassword}
            placeholder="Old password"
            onChange={e => handleChange(e)}
          />
        </div>
        <div className="form-group">
          <input
            type="password"
            className="form-control"
            name="newPassword"
            value={newPassword}
            placeholder="New password"
            onChange={e => handleChange(e)}
          />
        </div>
        <div className="form-group">
          <input
            type="password"
            className="form-control"
            name="newPassword2"
            value={newPassword2}
            placeholder="Confirm your password"
            onChange={e => handleChange(e)}
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
};

export default connect(null, { clearAlerts, changePassword })(ChangePassword);
