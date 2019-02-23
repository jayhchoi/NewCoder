import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { reduxForm } from 'redux-form';

import { addExperience } from '../../actions/profiles.action';
import { experienceFields } from '../../constants/profileFormFields';

import history from '../../utils/history';
import { CustomField } from '../../components';

class AddExperience extends Component {
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
      <div className="add-experience py-4">
        <div className="container">
          <div className="row">
            <div className="col-md-8 m-auto">
              <Link
                to={
                  this.props.location.state
                    ? this.props.location.state.from
                    : '/dashboard'
                }
                className="btn btn-light"
              >
                Back
              </Link>
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
      </div>
    );
  }
}

AddExperience.propTypes = {
  errors: PropTypes.object.isRequired,
  addExperience: PropTypes.func.isRequired
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
    addExperience
  }
)(AddExperience);

export default AddExperience;
