import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { reduxForm } from 'redux-form';

import { addEducation } from '../../actions/profiles.action';
import { setErrors } from '../../actions/errors.action';
import { educationFields } from '../../constants/profileFormFields';

import history from '../../utils/history';
import { CustomField, BackButton } from '../../components';
import { Page } from '../../styledComponents';

class AddEducation extends Component {
  componentDidMount() {
    this.props.setErrors();
  }

  onSubmit = values => {
    this.props.addEducation(values, history);
  };

  renderFields() {
    const { errors } = this.props;

    return educationFields.map(field => (
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
              <h1 className="display-4 text-center">교육사항 추가하기</h1>
              <p className="lead text-center">
                회원님의 과거 및 현재 교육사항을 추가해주세요
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

AddEducation.propTypes = {
  errors: PropTypes.object.isRequired,
  addEducation: PropTypes.func.isRequired,
  setErrors: PropTypes.func.isRequired
};

AddEducation = reduxForm({
  form: 'educationForm',
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
})(AddEducation);

const mapStateToProps = state => {
  return {
    errors: state.errors
  };
};

AddEducation = connect(
  mapStateToProps,
  {
    addEducation,
    setErrors
  }
)(AddEducation);

export default AddEducation;
