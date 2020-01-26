import React from 'react';

import { Link } from 'react-router-dom';

import Moment from 'react-moment';

const PostItem = ({ post }) => {
  return (
    <div>
      <Link to={`/posts/${post._id}`}>Single</Link>
      {post.user.firstName}{' '}
      <Moment format="MMM DD, YYYY">{post.creationDate}</Moment>{' '}
      {post.text}
    </div>
  );
};

export default PostItem;
