import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import styled from 'styled-components'

import history from '../../utils/history'
import { Page } from '../../wrappers'
import landingBackground from '../../img/landing-background.jpg'

class Landing extends Component {
  componentWillMount() {
    if (this.props.auth.isAuthenticated) {
      history.push('/dashboard')
    }
  }

  render() {
    return (
      <LandingPage>
        <div className="container">
          <div className="row">
            <div className="col-md-12 text-center">
              <HeaderText>
                <HeaderMain>NewCoder</HeaderMain>
                <HeaderSub>코딩 새내기들의 소셜네트워크</HeaderSub>
              </HeaderText>
              <div>
                <Button primary to="/register">
                  회원가입
                </Button>
                <Button secondary to="/login">
                  로그인
                </Button>
              </div>
            </div>
          </div>
        </div>
      </LandingPage>
    )
  }
}

const LandingPage = styled(Page)`
  background-image: linear-gradient(
      to right bottom,
      rgba(45, 52, 54, 0.8),
      rgba(99, 110, 114, 0.8)
    ),
    url(${landingBackground});
  background-size: cover;
  background-position: center;
`

const HeaderText = styled.h1`
  margin-top: 15%;
  margin-bottom: 50px;
  color: white;
`

const HeaderMain = styled.span`
  @keyframes moveInLeft {
    0% {
      opacity: 0;
      transform: translateX(-100px);
    }

    80% {
      opacity: 1;
      transform: translateX(10px);
    }

    100% {
      opacity: 1;
      transform: translate(0);
    }
  }

  font-size: 4.3rem;
  display: block;
  animation: moveInLeft 2s ease-out;
`

const HeaderSub = styled.span`
  @keyframes moveInRight {
    0% {
      opacity: 0;
      transform: translateX(100px);
    }

    80% {
      opacity: 1;
      transform: translateX(-10px);
    }

    100% {
      opacity: 1;
      transform: translate(0);
    }
  }

  font-size: 1.5rem;
  display: block;
  opacity: 0.7;
  animation: moveInRight 2s ease-out;
`

const Button = styled(Link)`
  @keyframes moveInBottom {
    0% {
      opacity: 0;
      transform: translateY(30px);
    }

    100% {
      opacity: 1;
      transform: translate(0);
    }
  }

  :link,
  :visited {
    display: inline-block;
    text-decoration: none;
    margin: 10px 10px;
    padding: 10px 20px;
    border-radius: 20px;
    animation: moveInBottom 2s ease-out;

    ${props => {
      if (props.primary) return 'background-color: #00cec9; color: white;'
      if (props.secondary) return 'background-color: #ff7675; color: white;'
      return 'background-color: white; color: black;'
    }}
  }

  :hover {
    transform: translateY(-3px);
    box-shadow: 0 10px 20px rgba(0, 0, 0, 0.2);
  }

  :active {
    transform: translateY(-1px);
    box-shadow: 0 5px 10px rgba(0, 0, 0, 0.2);
  }
`

Landing.propTypes = {
  auth: PropTypes.object.isRequired
}

const mapStateToProps = state => {
  return {
    auth: state.auth
  }
}

export default connect(mapStateToProps)(Landing)
