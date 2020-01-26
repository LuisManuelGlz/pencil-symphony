import React, { Fragment, useState, useEffect } from 'react';

import { connect } from 'react-redux';
import { clearAlerts } from '../../redux/actions/alert';
import {
  getProfile,
  updateProfile,
  changeUpdateProfileMode
} from '../../redux/actions/profile';

import Moment from 'react-moment';
import moment from 'moment';

const MyProfile = ({
  clearAlerts,
  profile: { isLoading, profile, isProfileUpdatedSuccessfully },
  user,
  getProfile,
  updateProfile,
  changeUpdateProfileMode
}) => {
  const [editProfileMode, setEditProfileMode] = useState(false);
  const [formData, setFormData] = useState({
    location: '',
    website: '',
    bio: ''
  });

  const { location, website, bio } = formData;

  useEffect(() => {
    getProfile(user._id);
  }, [getProfile, user._id]);

  useEffect(() => () => clearAlerts(), [clearAlerts]);

  const handleChange = e => {
    const { name, value } = e.target;

    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async e => {
    e.preventDefault();

    const profileData = {
      location,
      website,
      bio
    };

    await updateProfile(profileData);

    if (isProfileUpdatedSuccessfully) {
      changeUpdateProfileMode();
      setEditProfileMode(false);
    }
  };

  if (isLoading || profile === null) {
    return <div>Loading...</div>;
  }

  return (
    <div className="row">
      <div className="media">
        <img
          src="https://randomuser.me/api/portraits/men/81.jpg"
          className="mr-3"
          alt="..."
        />
        <div className="media-body">
          <h5 className="mt-0">
            <span className="mr-2">
              {profile.user.firstName} {profile.user.lastName}
            </span>

            <button
              className="badge badge-secondary"
              style={{ visibility: editProfileMode && 'hidden' }}
              onClick={() => setEditProfileMode(true)}
            >
              <i className="fas fa-pen mr-1" />
              Edit profile
            </button>
          </h5>
          {editProfileMode ? (
            <form onSubmit={e => handleSubmit(e)}>
              <div className="form-group">
                <label htmlFor="location" className="control-label">
                  Location
                </label>
                <input
                  type="text"
                  className="form-control"
                  name="location"
                  value={location}
                  placeholder="Location"
                  onChange={handleChange}
                />
              </div>
              <div className="form-group">
                <label htmlFor="website" className="control-label">
                  Website
                </label>
                <input
                  type="text"
                  className="form-control"
                  name="website"
                  value={website}
                  placeholder="Website"
                  onChange={e => handleChange(e)}
                />
              </div>
              <div className="form-group">
                <label htmlFor="bio" className="control-label">
                  Bio
                </label>
                <textarea
                  className="form-control"
                  name="bio"
                  value={bio}
                  placeholder="Bio"
                  onChange={e => handleChange(e)}
                />
              </div>
              <div className="form-group">
                <button className="btn btn-primary mr-2">Update profile</button>
                <button
                  className="btn"
                  onClick={() => setEditProfileMode(false)}
                >
                  Cancel
                </button>
              </div>
            </form>
          ) : (
            <Fragment>
              {profile.location && (
                <span className="text-muted mr-3">
                  <i className="fas fa-thumbtack mr-1" />
                  {profile.location}
                </span>
              )}
              {profile.website && (
                <span className="text-muted mr-3">
                  <i className="fas fa-globe mr-1" />
                  {profile.website}
                </span>
              )}
              {profile.creationDate && (
                <span className="text-muted">
                  <i className="fas fa-calendar-alt mr-1" />
                  Joined{' '}
                  <Moment format="MMMM YYYY">
                    {moment.utc(profile.creationDate)}
                  </Moment>
                </span>
              )}
              <br />
              {profile.bio && profile.bio}
            </Fragment>
          )}
        </div>
      </div>
    </div>
  );
};

const mapStateToProps = state => ({
  profile: state.profile,
  user: state.auth.user,
  alerts: state.alert
});

export default connect(mapStateToProps, {
  clearAlerts,
  getProfile,
  updateProfile,
  changeUpdateProfileMode
})(MyProfile);
