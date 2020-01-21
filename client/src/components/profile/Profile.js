import React, { Component, Fragment } from 'react';

import { connect } from 'react-redux';
import { getProfile } from '../../redux/actions/profile';

import { Redirect } from 'react-router-dom';

class Profile extends Component {
  componentDidMount = async () => {
    await this.props.getProfile(this.props.location.pathname.split('/')[2]);
  }

  render() {
    if (this.props.isLoading) {
      return <div>Loading...</div>
    }

    if (this.props.profile.user._id === this.props.user._id) {
      return <Redirect to="/me" />
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

              <button className="badge badge-primary">Follow</button>
            </h5>
            <span className="text-muted mr-2">
              {this.props.profile.location && this.props.profile.location}
            </span>
            <span className="text-muted">
              {this.props.profile.website && this.props.profile.website}
            </span>
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
  user: state.auth.user
});

export default connect(mapStateToProps, { getProfile })(Profile);
