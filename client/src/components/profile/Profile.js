import React, { Fragment, useEffect } from 'react';

import { connect } from 'react-redux';
import { getProfile } from '../../redux/actions/profile';

import { Redirect } from 'react-router-dom';

import Moment from 'react-moment';
import moment from 'moment';

const Profile = ({
  profile: { isLoading, profile },
  user,
  getProfile,
  location
}) => {
  useEffect(() => {
    getProfile(location.pathname.split('/')[2]);
  }, [getProfile, location.pathname]);

  if (isLoading) {
    return <div>Loading...</div>;
  } else if (!isLoading && profile === null) {
    return <Redirect to="/not-found" />;
  }

  if (profile.user._id === user._id) {
    return <Redirect to="/me" />;
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
              {!isLoading && (
                <Fragment>
                  {profile.user.firstName}{' '}
                  {profile.user.lastName}
                </Fragment>
              )}
            </span>

            <button className="badge badge-primary">
              <i className="fas fa-user-plus mr-1" />
              {/* <i className="fas fa-user-minus" /> */}
              Follow
            </button>
          </h5>
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
        </div>
      </div>
    </div>
  );
};

const mapStateToProps = state => ({
  profile: state.profile,
  user: state.auth.user
});

export default connect(mapStateToProps, { getProfile })(Profile);
