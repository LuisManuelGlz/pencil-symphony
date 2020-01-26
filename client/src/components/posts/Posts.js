import React, { useEffect } from 'react';

import { connect } from 'react-redux';
import { getPosts } from '../../redux/actions/post';

import PostForm from './PostForm';
import PostItem from './PostItem';

const Posts = ({ post: { posts, isLoading }, isAuthenticated, getPosts }) => {
  useEffect(() => {
    getPosts();
  }, [getPosts]);

  if (isLoading) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      <PostForm />
      {posts.length > 0 &&
        posts.map(post => <PostItem key={post._id} post={post} />)}
    </div>
  );
};

const mapStateToProps = state => ({
  post: state.post,
  isAuthenticated: state.auth.isAuthenticated
});

export default connect(mapStateToProps, { getPosts })(Posts);
