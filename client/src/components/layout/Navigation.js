import React, { Component, Fragment } from 'react';

import { connect } from 'react-redux';
import { logout } from '../../redux/actions/auth';

import { Link } from 'react-router-dom';

class Navigation extends Component {
  constructor(props) {
    super(props);

    this.handleCollapse = this.handleCollapse.bind(this);
  }

  handleCollapse() {
    const navbarNav = document.querySelector('#navbarNav');

    const navbarCollapsed = navbarNav.classList.contains('show');
    if (navbarCollapsed) {
      document.querySelector('.navbar-toggler').click();
    }
  }

  render() {
    return (
      <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
        <div className="container">
          <Link to="/" className="navbar-brand">
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
            {!this.props.isLoading && this.props.isAuthenticated && (
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
              {!this.props.isLoading &&
                (this.props.isAuthenticated ? (
                  <Fragment>
                    <li className="nav-item">
                      <Link
                        to="/posts"
                        className="nav-link"
                        onClick={this.handleCollapse}
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
                          {this.props.user.firstName}
                        </span>
                      </a>
                      <div
                        className="dropdown-menu"
                        aria-labelledby="navbarDropdown"
                      >
                        <Link
                          to="/me/"
                          className="dropdown-item"
                          onClick={this.handleCollapse}
                        >
                          Profile
                        </Link>
                        <Link
                          to="/account"
                          className="dropdown-item"
                          onClick={this.handleCollapse}
                        >
                          Account
                        </Link>
                        <div className="dropdown-divider"></div>
                        <button
                          className="dropdown-item"
                          onClick={() => {
                            this.props.logout();
                            this.handleCollapse();
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
                        onClick={this.handleCollapse}
                      >
                        Log In
                      </Link>
                    </li>
                    <li className="nav-item">
                      <Link
                        to="/signup"
                        className="nav-link btn btn-primary btn-sm text-dark ml-2"
                        onClick={this.handleCollapse}
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
  }
}

const matStateToProps = state => ({
  isAuthenticated: state.auth.isAuthenticated,
  isLoading: state.auth.isLoading,
  user: state.auth.user
});

export default connect(matStateToProps, { logout })(Navigation);
