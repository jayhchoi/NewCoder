import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import _ from 'lodash';

import { Spinner, BackButton } from '../../components';
import { Page } from '../../wrappers';

import { getProfileByHandle } from '../../actions/profiles.action';

import ProfileHeader from './ProfileHeader';
import ProfileAbout from './ProfileAbout';
import ProfileCredentials from './ProfileCredentials';
import ProfileGithub from './ProfileGithub';

class ProfileDetail extends Component {
  componentDidMount() {
    if (this.props.match.params.handle) {
      this.props.getProfileByHandle(this.props.match.params.handle);
    }
  }

  renderContent() {
    const { profile, isFetching } = this.props.profile;

    if (isFetching) {
      return <Spinner />;
    } else {
      if (_.isEmpty(profile)) {
        return <p className="lead">Profile does not exist</p>;
      } else {
        return (
          <div>
            <div className="row">
              <div className="col-md-6">
                <BackButton
                  state={this.props.location.state}
                  defaultTo="/profiles"
                />
              </div>
            </div>
            <ProfileHeader profile={profile} />
            <ProfileAbout profile={profile} />
            <ProfileCredentials
              education={profile.education}
              experience={profile.experience}
              location={this.props.location}
              profile={this.props.auth}
              auth={this.props.profile.profile}
            />
            {profile.githubusername ? (
              <ProfileGithub username={profile.githubusername} />
            ) : null}
          </div>
        );
      }
    }
  }

  render() {
    return (
      <Page>
        <div className="container">
          <div className="row">
            <div className="col-md-12">{this.renderContent()}</div>
          </div>
        </div>
      </Page>
    );
  }
}

ProfileDetail.propTypes = {
  getProfileByHandle: PropTypes.func.isRequired,
  profile: PropTypes.object.isRequired
};

const mapStateToProps = state => {
  return {
    profile: state.profile,
    auth: state.auth
  };
};

export default connect(
  mapStateToProps,
  {
    getProfileByHandle
  }
)(ProfileDetail);
