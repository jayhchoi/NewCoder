import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import _ from 'lodash';

import {
  getCurrentProfile,
  deleteAccount,
  deleteExperience,
  deleteEducation
} from '../../actions/profiles.action';
import { Spinner, Experience, Education } from '../../components';
import history from '../../utils/history';

import ProfileButtons from './ProfileButtons';

class Dashboard extends Component {
  componentDidMount() {
    this.props.getCurrentProfile();
  }

  onDelete = () => {
    this.props.deleteAccount(history);
  };

  renderContent() {
    const { user } = this.props.auth;
    const { profiles, isFetching } = this.props.profile;
    const profile = Object.values(profiles)[0];

    if (isFetching) {
      return <Spinner />;
    } else {
      if (_.isEmpty(profile)) {
        return (
          <div>
            <p className="lead text-muted">{user.name}님 환영합니다!</p>
            <p>
              아직 프로필을 작성하지 않으셨네요. 다른 회원분들과 더 원활한
              소통을 위해서 꼭 프로필을 작성해 주세요.
            </p>
            <Link to="/create-profile" className="btn btn-lg btn-info">
              프로필 작성하기
            </Link>
          </div>
        );
      } else {
        return (
          <div>
            <p className="lead text-muted">
              {user.name}님 환영합니다!
              <Link
                to={{
                  pathname: `/profile/${user.handle}`,
                  state: { from: this.props.location }
                }}
                className="btn btn-outline-primary ml-2"
              >
                <i className="fas fa-hand-point-right" /> 내 프로필 보기
              </Link>
            </p>
            <ProfileButtons />
            <Experience
              experience={profile.experience}
              onDeleteClick={this.props.deleteExperience}
            />
            <Education
              education={profile.education}
              onDeleteClick={this.props.deleteEducation}
            />
            {/* <button
              onClick={this.onDelete}
              className="d-block btn btn-danger mt-3"
            >
              <i className="fas fa-user-slash" /> 회원 탈퇴하기
            </button> */}
          </div>
        );
      }
    }
  }

  render() {
    return (
      <div className="dashboard py-4 page">
        <div className="container">
          <div className="row">
            <div className="col-md-12">
              <h1 className="display-4">
                <i className="fas fa-home" /> Home
              </h1>
              {this.renderContent()}
            </div>
          </div>
        </div>
      </div>
    );
  }
}

Dashboard.propTypes = {
  getCurrentProfile: PropTypes.func.isRequired,
  deleteAccount: PropTypes.func.isRequired,
  deleteExperience: PropTypes.func.isRequired,
  deleteEducation: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired,
  profile: PropTypes.object.isRequired
};

const mapStateToProps = state => {
  return {
    auth: state.auth,
    profile: state.profile // Getting a single profile from profilesReducer
  };
};

export default connect(
  mapStateToProps,
  {
    getCurrentProfile,
    deleteAccount,
    deleteExperience,
    deleteEducation
  }
)(Dashboard);
