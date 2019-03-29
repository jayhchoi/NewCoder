import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { reduxForm } from 'redux-form';

import { addExperience } from '../../actions/profiles.action';
import { setErrors } from '../../actions/errors.action';
import { experienceFields } from '../../constants/profileFormFields';

import history from '../../utils/history';
import { CustomField, BackButton } from '../../components';
import { Page } from '../../styledComponents';

class AddExperience extends Component {
  componentDidMount() {
    this.props.setErrors();
  }

  onSubmit = values => {
    this.props.addExperience(values, history);
  };

  renderFields() {
    const { errors } = this.props;

    return experienceFields.map(field => (
      <CustomField key={field.name} {...field} errors={errors} />
    ));
  }

  render() {
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
              <h1 className="display-4 text-center">경력사항 추가하기</h1>
              <p className="lead text-center">
                회원님의 과거 및 현재 경력사항을 추가해주세요
              </p>
              <small className="d-block pb-3">* = 필수항목</small>
              <form noValidate onSubmit={handleSubmit(this.onSubmit)}>
                {this.renderFields()}
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

AddExperience.propTypes = {
  errors: PropTypes.object.isRequired,
  addExperience: PropTypes.func.isRequired,
  setErrors: PropTypes.func.isRequired
};

AddExperience = reduxForm({
  form: 'experienceForm',
  onChange: ({ current }, dispatch, props) => {
    if (current === true) {
      // Clear 'to' field if 'current' is set to TRUE
      dispatch(props.change('to', ''));
      // Disable 'to' field
      document.getElementsByName('to')[0].setAttribute('disabled', 'true');
    } else {
      // Enable 'to' field
      document.getElementsByName('to')[0].removeAttribute('disabled');
    }
  }
})(AddExperience);

const mapStateToProps = state => {
  return {
    errors: state.errors
  };
};

AddExperience = connect(
  mapStateToProps,
  {
    addExperience,
    setErrors
  }
)(AddExperience);

export default AddExperience;
