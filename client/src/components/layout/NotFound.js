import React, { Component, Fragment } from 'react';
import { Link } from 'react-router-dom';

class NotFound extends Component {
  render() {
    return (
      <Fragment>
        <div className="row d-flex justify-content-center">
          <span className="display-4 text-danger">404</span>
        </div>
        <div className="row d-flex justify-content-center">
          <span className="display-4">
            Page not found <span role="img" aria-label="sad">🙁</span>
          </span>
        </div>
        <div className="row d-flex justify-content-center mt-2">
          <Link to="/" className="btn">Go to home</Link>
        </div>
      </Fragment>
    );
  }
}

export default NotFound;
