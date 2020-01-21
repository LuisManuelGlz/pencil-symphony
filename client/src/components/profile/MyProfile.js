import React, { Component, Fragment } from 'react';

import { connect } from 'react-redux';
import { getProfile, updateProfile } from '../../redux/actions/profile';

import Moment from 'react-moment';
import moment from 'moment';

class MyProfile extends Component {
  constructor(props) {
    super(props);
    this.state = {
      editProfileMode: false,
      location: '',
      website: '',
      bio: ''
    };

    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  componentDidMount = async () => {
    await this.props.getProfile(this.props.user._id);

    this.setState({
      location: this.props.profile.location,
      website: this.props.profile.website,
      bio: this.props.profile.bio
    });
  };

  handleChange(e) {
    const { name, value } = e.target;

    this.setState({ [name]: value });
  }

  handleSubmit = async e => {
    e.preventDefault();

    const profileData = {
      location: this.state.location,
      website: this.state.website,
      bio: this.state.bio
    };

    await this.props.updateProfile(profileData);

    if (this.props.success[0].typeAlert === 'success') {
      this.setState({
        editProfileMode: false,
        location: this.props.profile.location,
        website: this.props.profile.website,
        bio: this.props.profile.bio
      });
    }
  };

  render() {
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

              <button
                className="badge badge-secondary"
                style={{ visibility: this.state.editProfileMode && 'hidden' }}
                onClick={() => this.setState({ editProfileMode: true })}
              >
                Edit profile
              </button>
            </h5>
            {this.state.editProfileMode ? (
              <form onSubmit={this.handleSubmit}>
                <div className="form-group">
                  <input
                    type="text"
                    className="form-control"
                    name="location"
                    value={this.state.location}
                    placeholder="Location"
                    onChange={this.handleChange}
                  />
                </div>
                <div className="form-group">
                  <input
                    type="text"
                    className="form-control"
                    name="website"
                    value={this.state.website}
                    placeholder="Website"
                    onChange={this.handleChange}
                  />
                </div>
                <div className="form-group">
                  <textarea
                    className="form-control"
                    name="bio"
                    value={this.state.bio}
                    placeholder="Bio"
                    onChange={this.handleChange}
                  />
                </div>
                <div className="form-group">
                  <button className="btn btn-primary mr-2">
                    Update profile
                  </button>
                  <button
                    className="btn"
                    onClick={() => this.setState({ editProfileMode: false })}
                  >
                    Cancel
                  </button>
                </div>
              </form>
            ) : (
              <Fragment>
                <span className="text-muted">
                  {this.props.profile.location && (
                    <span className="mr-2">{this.props.profile.location}</span>
                  )}
                </span>
                <span className="text-muted">
                  {this.props.profile.website && (
                    <span className="mr-2">{this.props.profile.website}</span>
                  )}
                </span>
                <span className="text-muted">
                  {this.props.profile.creationDate && (
                    <Fragment>
                      Joined{' '}
                      <Moment format="MMMM YYYY">
                        {moment.utc(this.props.profile.creationDate)}
                      </Moment>
                    </Fragment>
                  )}
                </span>
                <br />
                {this.props.profile.bio && this.props.profile.bio}
              </Fragment>
            )}
          </div>
        </div>
      </div>
    );
  }
}

const mapStateToProps = state => ({
  profile: state.profile.profile,
  user: state.auth.user,
  success: state.alert
});

export default connect(mapStateToProps, { getProfile, updateProfile })(
  MyProfile
);
