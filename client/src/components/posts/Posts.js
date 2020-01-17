import React, { Component } from 'react';
import { Link } from 'react-router-dom';

class Posts extends Component {
  render() {
    return (
      <div>
        All posts
        <Link to="/posts/1">Testing post</Link>
      </div>
    );
  }
}

export default Posts;
