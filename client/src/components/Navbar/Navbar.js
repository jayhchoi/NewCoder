import React, { Component, Fragment } from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

import { logoutUser } from '../../actions/auth.action';
import logo from '../../img/newcoder_logo_single.png';

class Navbar extends Component {
  render() {
    const { isAuthenticated, user } = this.props.auth;

    return (
      <nav className="navbar navbar-expand-md navbar-dark bg-dark fixed-top">
        <div className="container">
          <span
            data-toggle="collapse"
            data-target="#mobile-nav.show"
            style={{ margin: '0' }}
          >
            <Link className="navbar-brand m-0 p-0" to="/">
              <img
                src={logo}
                style={{ width: '120px', margin: '0' }}
                alt="Not Found"
              />
            </Link>
          </span>
          <ul className="navbar-nav mr-auto">
            <li
              className="nav-item"
              data-toggle="collapse"
              data-target="#mobile-nav.show"
            >
              <Link className="nav-link" to="/profiles">
                {' '}
                회원목록
              </Link>
            </li>
          </ul>
          <button
            className="navbar-toggler"
            type="button"
            data-toggle="collapse"
            data-target="#mobile-nav"
          >
            <span className="navbar-toggler-icon" />
          </button>

          <div className="collapse navbar-collapse" id="mobile-nav">
            <ul className="navbar-nav ml-auto">
              {isAuthenticated ? (
                <Fragment>
                  <li
                    className="nav-item"
                    data-toggle="collapse"
                    data-target="#mobile-nav"
                  >
                    <Link className="nav-link" to="/dashboard">
                      <img
                        className="rounded-circle"
                        src={user.avatar}
                        alt={user.name}
                        style={{ width: '30px', marginRight: '10px' }}
                        title="https://ko.gravatar.com/ 에서 프로필 이미지를 추가하세요!"
                      />
                      <span
                        className="text-info"
                        style={{ borderBottom: 'solid 1px teal' }}
                      >
                        {user.name}
                      </span>
                    </Link>
                  </li>
                  <li
                    className="nav-item"
                    data-toggle="collapse"
                    data-target="#mobile-nav"
                  >
                    <Link className="nav-link" to="/feed">
                      게시판
                    </Link>
                  </li>
                  <li
                    className="nav-item"
                    data-toggle="collapse"
                    data-target="#mobile-nav"
                  >
                    <a
                      href="/"
                      className="nav-link"
                      onClick={this.props.logoutUser}
                    >
                      로그아웃
                    </a>
                  </li>
                </Fragment>
              ) : (
                <Fragment>
                  <li
                    className="nav-item"
                    data-toggle="collapse"
                    data-target="#mobile-nav"
                  >
                    <Link className="nav-link" to="/register">
                      회원가입
                    </Link>
                  </li>
                  <li
                    className="nav-item"
                    data-toggle="collapse"
                    data-target="#mobile-nav"
                  >
                    <Link className="nav-link" to="/login">
                      로그인
                    </Link>
                  </li>
                </Fragment>
              )}
            </ul>
          </div>
        </div>
      </nav>
    );
  }
}

Navbar.propTypes = {
  auth: PropTypes.object.isRequired,
  logoutUser: PropTypes.func.isRequired
};

const mapStateToProps = state => {
  return {
    auth: state.auth
  };
};

export default connect(
  mapStateToProps,
  {
    logoutUser
  }
)(Navbar);
