import React, { Component } from 'react'
import { reduxForm } from 'redux-form'
import { connect } from 'react-redux'
import { withRouter } from 'react-router-dom'
import PropTypes from 'prop-types'
import { Helmet } from 'react-helmet'

import CustomField from '../../components/CustomField/CustomField'
import loginFormFields from './loginFormFields'
import { Page } from '../../wrappers'

import { loginUser } from '../../actions/auth.action'
import { setErrors } from '../../actions/errors.action'

class Login extends Component {
  componentWillReceiveProps(nextProps) {
    const { from } = this.props.location.state || {
      from: { pathname: '/dashboard' }
    }
    if (nextProps.auth.isAuthenticated) {
      this.props.history.push(from.pathname)
    }
  }

  componentDidMount() {
    this.props.setErrors()
  }

  onSubmit = values => {
    this.props.loginUser(values, this.props.history)
  }

  renderFields = () => {
    const { errors } = this.props

    return loginFormFields.map(field => (
      <CustomField key={field.name} {...field} errors={errors} />
    ))
  }

  render() {
    const { handleSubmit } = this.props

    return (
      <Page>
        <Helmet>
          <title>NewCoder | 로그인</title>
        </Helmet>
        <div className="container">
          <div className="row">
            <div className="col-md-8 m-auto">
              <h1 className="text-center">로그인</h1>
              <p className="text-center">
                지금 로그인하고 지역모임에 참여하세요!
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
      </Page>
    )
  }
}

Login.propTypes = {
  loginUser: PropTypes.func.isRequired,
  setErrors: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired,
  errors: PropTypes.object.isRequired
}

const mapStateToProps = state => {
  return {
    auth: state.auth,
    errors: state.errors
  }
}

Login = connect(
  mapStateToProps,
  {
    loginUser,
    setErrors
  }
)(withRouter(Login))

export default reduxForm({
  form: 'loginForm'
})(Login)
