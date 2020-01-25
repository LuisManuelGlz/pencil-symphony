import React, { Component, Fragment } from 'react';

import { connect } from 'react-redux';
import { getProfile } from '../../redux/actions/profile';

import { Redirect } from 'react-router-dom';

import Moment from 'react-moment';
import moment from 'moment';

class Profile extends Component {
  componentDidMount = async () => {
    await this.props.getProfile(this.props.location.pathname.split('/')[2]);
  };

  render() {
    if (this.props.isLoading) {
      return <div>Loading...</div>;
    } else if (!this.props.isLoading && !this.props.profileExist) {
      return <Redirect to="/not-found" />;
    }

    if (this.props.profile.user._id === this.props.user._id) {
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
                {!this.props.profile.isLoading && (
                  <Fragment>
                    {this.props.profile.user.firstName}{' '}
                    {this.props.profile.user.lastName}
                  </Fragment>
                )}
              </span>

              <button className="badge badge-primary">
                <i className="fas fa-user-plus mr-1" />
                {/* <i className="fas fa-user-minus" /> */}
                Follow
              </button>
            </h5>
            {this.props.profile.location && (
              <span className="text-muted mr-3">
                <i className="fas fa-thumbtack mr-1" />
                {this.props.profile.location}
              </span>
            )}
            {this.props.profile.website && (
              <span className="text-muted mr-3">
                <i className="fas fa-globe mr-1" />
                {this.props.profile.website}
              </span>
            )}
            {this.props.profile.creationDate && (
              <span className="text-muted">
                <i className="fas fa-calendar-alt mr-1" />
                Joined{' '}
                <Moment format="MMMM YYYY">
                  {moment.utc(this.props.profile.creationDate)}
                </Moment>
              </span>
            )}
            <br />
            {this.props.profile.bio && this.props.profile.bio}
          </div>
        </div>
      </div>
    );
  }
}

const mapStateToProps = state => ({
  isLoading: state.profile.isLoading,
  profile: state.profile.profile,
  profileExist: state.profile.profileExist,
  user: state.auth.user
});

export default connect(mapStateToProps, { getProfile })(Profile);
