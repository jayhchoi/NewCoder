import React, { Component } from 'react'
import { reduxForm } from 'redux-form'
import { connect } from 'react-redux'
import { withRouter } from 'react-router-dom'
import PropTypes from 'prop-types'
import { Helmet } from 'react-helmet'

import CustomField from '../../components/CustomField/CustomField'
import loginFormFields from './loginFormFields'

import { Page, Button } from '../../styledComponents'
import { Container, Row, ColMed } from '../../styledComponents/grid'
import { HeadingOne, HeadingTwo } from '../../styledComponents/typo'

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
        <Container>
          <Row>
            <ColMed>
              <HeadingOne textCenter>로그인</HeadingOne>
              <HeadingTwo textCenter>
                지금 로그인하고 지역모임에 참여하세요!
              </HeadingTwo>
              <form noValidate onSubmit={handleSubmit(this.onSubmit)}>
                {this.renderFields()}
                <Button secondary block type="submit">
                  확인
                </Button>
              </form>
            </ColMed>
          </Row>
        </Container>
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
