import React, { Component } from 'react';

import { Link } from 'react-router-dom';

import Moment from 'react-moment';

class PostItem extends Component {
  render() {
    return (
      <div>
        <Link to={`/posts/${this.props.post._id}`}>Single</Link>
        {this.props.post.user.firstName}{' '}
        <Moment format="MMM DD, YYYY">{this.props.post.creationDate}</Moment>{' '}
        {this.props.post.text}
      </div>
    );
  }
}

export default PostItem;
