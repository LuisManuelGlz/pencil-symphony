import React, { useEffect } from 'react';

import { withRouter } from 'react-router-dom';

const Post = ({ location }) => {
  useEffect(() => {
    console.log(location.pathname.split('/')[2]);
  });
  
  return (
    <div>
      Single post
    </div>
  );
};

export default withRouter(Post);
