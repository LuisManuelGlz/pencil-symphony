import React, { Fragment } from 'react';

import { connect } from 'react-redux';
import { logout } from '../../redux/actions/auth';

import { Link } from 'react-router-dom';

const Navigation = ({ auth: { isAuthenticated, isLoading, user }, logout }) => {
  const handleCollapse = () => {
    const navbarNav = document.querySelector('#navbarNav');

    const navbarCollapsed = navbarNav.classList.contains('show');

    if (navbarCollapsed) {
      document.querySelector('.navbar-toggler').click();
    }
  };

  return (
    <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
      <div className="container">
        <Link to="/" className="navbar-brand" onClick={() => handleCollapse()}>
          Pencil Symphony
        </Link>
        <button
          className="navbar-toggler"
          type="button"
          data-toggle="collapse"
          data-target="#navbarNav"
          aria-controls="navbarNav"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>

        <div className="collapse navbar-collapse" id="navbarNav">
          {!isLoading && isAuthenticated && (
            <form className="form-inline my-2 my-lg-0">
              <input
                className="form-control mr-sm-2"
                type="search"
                placeholder="Search"
                aria-label="Search"
              />
              <button
                className="btn btn-outline-primary my-2 my-sm-0"
                type="submit"
              >
                Search
              </button>
            </form>
          )}

          <ul className="navbar-nav ml-auto">
            {!isLoading &&
              (isAuthenticated ? (
                <Fragment>
                  <li className="nav-item">
                    <Link
                      to="/posts"
                      className="nav-link"
                      onClick={() => handleCollapse()}
                    >
                      Posts
                    </Link>
                  </li>
                  <li className="nav-item dropdown">
                    <a
                      className="nav-link dropdown-toggle"
                      href="!#"
                      id="navbarDropdown"
                      role="button"
                      data-toggle="dropdown"
                      aria-haspopup="true"
                      aria-expanded="false"
                    >
                      <span>
                        <i className="fa fa-user mr-1"></i>
                        {user.firstName}
                      </span>
                    </a>
                    <div
                      className="dropdown-menu"
                      aria-labelledby="navbarDropdown"
                    >
                      <Link
                        to="/me/"
                        className="dropdown-item"
                        onClick={() => handleCollapse()}
                      >
                        Profile
                      </Link>
                      <Link
                        to="/account"
                        className="dropdown-item"
                        onClick={() => handleCollapse()}
                      >
                        Account
                      </Link>
                      <div className="dropdown-divider"></div>
                      <button
                        className="dropdown-item"
                        onClick={() => {
                          logout();
                          handleCollapse();
                        }}
                      >
                        <i className="fa fa-sign-out-alt mr-1"></i>
                        Log Out
                      </button>
                    </div>
                  </li>
                </Fragment>
              ) : (
                <Fragment>
                  <li className="nav-item">
                    <Link
                      to="/login"
                      className="nav-link"
                      onClick={() => handleCollapse()}
                    >
                      Log In
                    </Link>
                  </li>
                  <li className="nav-item">
                    <Link
                      to="/signup"
                      className="nav-link btn btn-primary btn-sm text-dark ml-2"
                      onClick={() => handleCollapse()}
                    >
                      Sign Up
                    </Link>
                  </li>
                </Fragment>
              ))}
          </ul>
        </div>
      </div>
    </nav>
  );
};

const matStateToProps = state => ({
  auth: state.auth
});

export default connect(matStateToProps, { logout })(Navigation);
