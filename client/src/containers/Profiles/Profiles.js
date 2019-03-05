import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { Helmet } from 'react-helmet';

import { Spinner } from '../../components';
import { getProfiles } from '../../actions/profiles.action';
import Profile from './Profile';

class Profiles extends Component {
  componentDidMount() {
    this.props.getProfiles();
  }

  renderContent() {
    let { profiles, isFetching } = this.props.profile;

    profiles = Object.values(profiles);

    if (isFetching) {
      return <Spinner />;
    } else {
      if (profiles.length === 0) {
        return (
          <h5 className="text-warning text-center mt-5">
            프로필을 찾을 수 없습니다.
          </h5>
        );
      } else {
        return (
          <div className="row">
            {profiles.map(profile => (
              <Profile key={profile._id} profile={profile} />
            ))}
          </div>
        );
      }
    }
  }

  render() {
    return (
      <div className="profiles bg-secondary page">
        <Helmet>
          <title>NewCoder | 회원목록</title>
        </Helmet>
        <div className="container">
          <div className="row">
            <div className="col-md-12">
              <h1 className="display-4 text-center text-white">
                뉴코더 회원목록
              </h1>
              <p className="lead text-center text-white">
                다른 회원들의 프로필을 확인해 보세요
              </p>
              {this.renderContent()}
            </div>
          </div>
        </div>
      </div>
    );
  }
}

Profiles.propTypes = {
  getProfiles: PropTypes.func.isRequired,
  profile: PropTypes.object.isRequired
};

const mapStateToProps = state => {
  return {
    profile: state.profile
  };
};

export default connect(
  mapStateToProps,
  {
    getProfiles
  }
)(Profiles);
