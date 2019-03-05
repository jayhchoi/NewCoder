import React, { Component } from 'react';
import { connect } from 'react-redux';
import { reduxForm } from 'redux-form';
import PropTypes from 'prop-types';

import history from '../../utils/history';

import { CustomField, BackButton } from '../../components';
import { profileFields, socialFields } from '../../constants/profileFormFields';
import {
  createProfile,
  getCurrentProfile
} from '../../actions/profiles.action';
import { setErrors } from '../../actions/errors.action';

class CreateProfile extends Component {
  state = {
    displaySocialInputs: false
  };

  componentDidMount() {
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
    const { handleSubmit } = this.props;

    return (
      <div className="create-profile py-4 page">
        <div className="container">
          <div className="row">
            <div className="col-md-8 m-auto">
              <BackButton
                state={this.props.location.state}
                defaultTo="/dashboard"
              />
              <h1 className="display-4 text-center">프로필 작성하기</h1>
              <p className="lead text-center">
                회원님의 기본 정보와 간단한 자기소개를 공유해주세요.
              </p>
              <small className="d-block pb-3">* = 필수항목</small>
              <form noValidate onSubmit={handleSubmit(this.onSubmit)}>
                {this.renderFields()}
                <button
                  type="button"
                  className="btn btn-primary mb-3"
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
      </div>
    );
  }
}

CreateProfile.propTypes = {
  errors: PropTypes.object.isRequired,
  createProfile: PropTypes.func.isRequired,
  setErrors: PropTypes.func.isRequired
};

CreateProfile = reduxForm({
  form: 'profileForm'
})(CreateProfile);

const mapStateToProps = state => {
  return {
    errors: state.errors
  };
};

CreateProfile = connect(
  mapStateToProps,
  {
    createProfile,
    getCurrentProfile,
    setErrors
  }
)(CreateProfile);

export default CreateProfile;
