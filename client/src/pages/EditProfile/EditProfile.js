import React, { Component } from 'react';
import { connect } from 'react-redux';
import { reduxForm } from 'redux-form';
import PropTypes from 'prop-types';

import history from '../../utils/history';

import { CustomField, Spinner, BackButton } from '../../components';
import { Page } from '../../styledComponents';

import { profileFields, socialFields } from '../../constants/profileFormFields';
import {
  createProfile,
  getCurrentProfile
} from '../../actions/profiles.action';
import { setErrors } from '../../actions/errors.action';

class EditProfile extends Component {
  state = {
    displaySocialInputs: true
  };

  componentDidMount() {
    this.props.getCurrentProfile();
    this.props.setErrors();
  }

  onSubmit = values => {
    this.props.createProfile(values, history);
  };

  renderFields() {
    const { errors } = this.props;

    return profileFields.map(field => (
      <CustomField key={field.name} {...field} errors={errors} />
    ));
  }

  renderSocialFields() {
    const { errors } = this.props;

    return socialFields.map(field => (
      <CustomField key={field.name} {...field} errors={errors} />
    ));
  }

  render() {
    if (
      this.props.profile.isFetching ||
      Object.keys(this.props.profile.profile).length === 0
    )
      return <Spinner />;

    const { handleSubmit } = this.props;
    return (
      <Page>
        <div className="container">
          <div className="row">
            <div className="col-md-8 m-auto">
              <BackButton
                state={this.props.location.state}
                defaultTo="/dashboard"
              />

              <h1 className="display-4 text-center">프로필 수정하기</h1>
              <p className="lead text-center">
                회원님의 최신 프로필을 업데이트 해주세요
              </p>
              <small className="d-block pb-3">* = 필수항목</small>
              <form noValidate onSubmit={handleSubmit(this.onSubmit)}>
                {this.renderFields()}
                <button
                  type="button"
                  className="btn btn-light mb-3"
                  onClick={() =>
                    this.setState({
                      displaySocialInputs: !this.state.displaySocialInputs
                    })
                  }
                >
                  SNS 계정 추가하기
                </button>
                {this.state.displaySocialInputs
                  ? this.renderSocialFields()
                  : null}

                <button type="submit" className="btn btn-info btn-block mt-4">
                  완료
                </button>
              </form>
            </div>
          </div>
        </div>
      </Page>
    );
  }
}

EditProfile.propTypes = {
  errors: PropTypes.object.isRequired,
  createProfile: PropTypes.func.isRequired,
  setErrors: PropTypes.func.isRequired,
  initialValues: PropTypes.object
};

EditProfile = reduxForm({
  form: 'profileForm',
  enableReinitialize: true
})(EditProfile);

const mapStateToProps = state => {
  return {
    errors: state.errors,
    profile: state.profile,
    initialValues: { ...state.profile.profile, ...state.profile.profile.social }
  };
};

EditProfile = connect(
  mapStateToProps,
  {
    createProfile,
    getCurrentProfile,
    setErrors
  }
)(EditProfile);

export default EditProfile;
