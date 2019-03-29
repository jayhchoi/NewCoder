import React, { Component } from 'react'
import { connect } from 'react-redux'
import { reduxForm } from 'redux-form'
import PropTypes from 'prop-types'
import { Helmet } from 'react-helmet'
import styled from 'styled-components'

import CustomField from '../../components/CustomField/CustomField'
import registerFormFields from './registerFormFields'
import { Page, Button } from '../../styledComponents'
import { Container, Row, ColMed } from '../../styledComponents/grid'
import { HeadingOne, HeadingTwo } from '../../styledComponents/typo'

import { registerUser } from '../../actions/auth.action'
import { setErrors } from '../../actions/errors.action'

class Register extends Component {
  componentWillReceiveProps(nextProps) {
    if (nextProps.auth.isAuthenticated) {
      this.props.history.push('/dashboard')
    }
  }

  componentDidMount() {
    this.props.setErrors()
  }

  onSubmit = values => {
    this.props.registerUser(values, this.props.history)
  }

  renderFields = () => {
    const { errors } = this.props

    return registerFormFields.map(field => (
      <CustomField key={field.name} {...field} errors={errors} />
    ))
  }

  render() {
    const { handleSubmit } = this.props

    return (
      <Page>
        <Helmet>
          <title>NewCoder | 회원가입</title>
        </Helmet>
        <Container>
          <Row>
            <ColMed>
              <HeadingOne textCenter>회원가입</HeadingOne>
              <HeadingTwo textCenter>
                뉴코더에 가입하고 함께 코딩하세요!
              </HeadingTwo>
              <form noValidate onSubmit={handleSubmit(this.onSubmit)}>
                {this.renderFields()}
                <Button block secondary type="submit">
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

Register.propTypes = {
  registerUser: PropTypes.func.isRequired,
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

Register = connect(
  mapStateToProps,
  {
    registerUser,
    setErrors
  }
)(Register)

Register = reduxForm({
  form: 'registerForm'
})(Register)

export default Register
