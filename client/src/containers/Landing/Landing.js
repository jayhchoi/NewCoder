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
                <h1 className="display-4 mt-5">Keep coding, don't stop</h1>
                <h5 className="mt-4">코딩 입문자들을 위한 소셜네트워크</h5>
                <div className="mt-4">
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
