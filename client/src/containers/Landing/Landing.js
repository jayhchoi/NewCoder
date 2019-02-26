import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import history from '../../utils/history';

class Landing extends Component {
  componentWillMount() {
    if (this.props.auth.isAuthenticated) {
      history.push('/dashboard');
    }
  }

  render() {
    return (
      <div className="landing page">
        <div className="dark-overlay landing-inner text-light">
          <div className="container">
            <div className="row">
              <div className="col-md-12 text-center">
                <h1 className="display-3 mb-4">뉴코더</h1>
                <p className="lead">
                  {' '}
                  새롭게 개발에 입문하는 뉴코더들을 위한 소셜네트워크 <br />
                  <em>
                    프로필을 작성해서 나를 알리고, 정보를 공유하고, 다른
                    뉴코더들과 만나세요
                  </em>
                </p>
                <hr />
                <Link to="/register" className="btn btn-lg btn-info mr-2">
                  회원가입
                </Link>
                <Link to="/login" className="btn btn-lg btn-light">
                  로그인
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

Landing.propTypes = {
  auth: PropTypes.object.isRequired
};

const mapStateToProps = state => {
  return {
    auth: state.auth
  };
};

export default connect(mapStateToProps)(Landing);
