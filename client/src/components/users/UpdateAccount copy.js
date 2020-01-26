import React, { Fragment, useState } from 'react';

import { connect } from 'react-redux';
import { updateAccount } from '../../redux/actions/users';

const UpdateAccount = ({ success, updateAccount }) => {
  const [formData, setFormData] = useState({
    updateAccountMode: false,
    newFirstName: '',
    newLastName: '',
    newEmail: ''
  });

  const { updateAccountMode, newFirstName, newLastName, newEmail } = formData;

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

    if (success[0].typeAlert === 'success') {
      setFormData({
        updateAccountMode: false,
        newFirstName: '',
        newLastName: '',
        newEmail: ''
      });
    }
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
            <button
              className="btn"
              onClick={() =>
                setFormData({ ...formData, updateAccountMode: false })
              }
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
            onClick={() =>
              setFormData({ ...formData, updateAccountMode: true })
            }
          >
            Update account
          </button>
        </Fragment>
      )}
    </div>
  );
};

const mapStateToProps = state => ({
  success: state.alert
});

export default connect(mapStateToProps, { updateAccount })(UpdateAccount);
