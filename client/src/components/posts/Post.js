import React, { Component } from 'react';

import { withRouter } from 'react-router-dom';

class Post extends Component {
  componentDidMount() {
    console.log(this.props.location.pathname.split('/')[2]);
  }
  
  render() {
    return (
      <div>
        Single post
      </div>
    );
  }
}

export default withRouter(Post);
