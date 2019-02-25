import React, { Component } from 'react';
import { connect } from 'react-redux';
import { reduxForm } from 'redux-form';
import PropTypes from 'prop-types';
import { withRouter } from 'react-router-dom';

import CustomField from '../../components/CustomField/CustomField';
import registerFormFields from './registerFormFields';

import { registerUser } from '../../actions/auth.action';
import { setErrors } from '../../actions/errors.action';

class Register extends Component {
  componentWillReceiveProps(nextProps) {
    if (nextProps.auth.isAuthenticated) {
      this.props.history.push('/dashboard');
    }
  }

  componentDidMount() {
    this.props.setErrors();
  }

  onSubmit = values => {
    this.props.registerUser(values, this.props.history);
  };

  renderFields = () => {
    const { errors } = this.props;

    return registerFormFields.map(field => (
      <CustomField key={field.name} {...field} errors={errors} />
    ));
  };

  render() {
    const { handleSubmit } = this.props;

    return (
      <div>
        <div className="register py-4 page">
          <div className="container">
            <div className="row">
              <div className="col-md-8 m-auto">
                <h1 className="display-4 text-center">회원가입</h1>
                <p className="lead text-center">
                  뉴코더에 가입하고 함께 코딩하세요!
                </p>
                <form noValidate onSubmit={handleSubmit(this.onSubmit)}>
                  {this.renderFields()}
                  <button type="submit" className="btn btn-info btn-block mt-4">
                    확인
                  </button>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

Register.propTypes = {
  registerUser: PropTypes.func.isRequired,
  setErrors: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired,
  errors: PropTypes.object.isRequired
};

const mapStateToProps = state => {
  return {
    auth: state.auth,
    errors: state.errors
  };
};

Register = connect(
  mapStateToProps,
  {
    registerUser,
    setErrors
  }
)(withRouter(Register));

export default reduxForm({
  form: 'registerForm'
})(Register);
