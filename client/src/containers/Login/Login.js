import React, { Component } from 'react';
import { reduxForm } from 'redux-form';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import PropTypes from 'prop-types';

import CustomField from '../../components/CustomField/CustomField';
import loginFormFields from './loginFormFields';

import { loginUser } from '../../actions/auth.action';
import { setErrors } from '../../actions/errors.action';

class Login extends Component {
  componentWillReceiveProps(nextProps) {
    const { from } = this.props.location.state || {
      from: { pathname: '/dashboard' }
    };
    if (nextProps.auth.isAuthenticated) {
      this.props.history.push(from.pathname);
    }
  }

  componentDidMount() {
    this.props.setErrors();
  }

  onSubmit = values => {
    this.props.loginUser(values, this.props.history);
  };

  renderFields = () => {
    const { errors } = this.props;

    return loginFormFields.map(field => (
      <CustomField key={field.name} {...field} errors={errors} />
    ));
  };

  render() {
    const { handleSubmit } = this.props;

    return (
      <div className="login py-4">
        <div className="container">
          <div className="row">
            <div className="col-md-8 m-auto">
              <h1 className="display-4 text-center">Log In</h1>
              <p className="lead text-center">
                Sign in to your DevConnector account
              </p>
              <form noValidate onSubmit={handleSubmit(this.onSubmit)}>
                {this.renderFields()}
                <button type="submit" className="btn btn-info btn-block mt-4">
                  Confirm
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

Login.propTypes = {
  loginUser: PropTypes.func.isRequired,
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

Login = connect(
  mapStateToProps,
  {
    loginUser,
    setErrors
  }
)(withRouter(Login));

export default reduxForm({
  form: 'loginForm'
})(Login);
