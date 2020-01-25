import React, { Component } from 'react';

import { connect } from 'react-redux';
import { getPosts } from '../../redux/actions/post';

import PostForm from './PostForm';
import PostItem from './PostItem';

class Posts extends Component {
  componentDidMount() {
    this.props.getPosts();
  };

  render() {
    return this.props.isLoading && this.props.posts === null ? (
      <div>Loading...</div>
    ) : (
      <div>
        <PostForm />
        {this.props.posts !== null &&
          this.props.posts.map(post => <PostItem key={post._id} post={post} />)}
      </div>
    );
  }
}

const mapStateToProps = state => ({
  posts: state.post.posts,
  isLoading: state.post.isLoading,
  isAuthenticated: state.auth.isAuthenticated
});

export default connect(mapStateToProps, { getPosts })(Posts);
