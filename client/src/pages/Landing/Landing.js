import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import styled from 'styled-components'

import history from '../../utils/history'
import { Page } from '../../styledComponents'
import bgVideoMp4 from '../../img/Aloha-Mundo.mp4'
import bgVideoWebm from '../../img/Aloha-Mundo.webm'

class Landing extends Component {
  componentWillMount() {
    if (this.props.auth.isAuthenticated) {
      history.push('/dashboard')
    }
  }

  render() {
    return (
      <LandingPage>
        <BackgroundVideo>
          <BackgroundVideoContent muted autoPlay loop>
            <source src={bgVideoMp4} type="video/mp4" />
            <source src={bgVideoWebm} type="video/webm" />
            Can't play background video
          </BackgroundVideoContent>
        </BackgroundVideo>

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
  position: relative;
`

const BackgroundVideo = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  height: 100%;
  width: 100%;
  /* z-index: -1; */
  opacity: 0.8;
  overflow: hidden;
`

const BackgroundVideoContent = styled.video`
  height: 100%;
  width: 100%;
  object-fit: cover;
`

const HeaderText = styled.h1`
  padding: 10rem 0;
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

  font-size: 7rem;
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

  font-size: 2.5rem;
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
    margin: 1rem 1.5rem;
    padding: 1rem 2rem;
    border-radius: 2rem;
    animation: moveInBottom 2s ease-out;

    ${props => {
      if (props.primary) return 'background-color: #00cec9; color: white;'
      if (props.secondary) return 'background-color: #ff7675; color: white;'
      return 'background-color: white; color: black;'
    }}
  }

  :hover {
    transform: translateY(-3px) scale(1.1);
    box-shadow: 0 10px 20px rgba(0, 0, 0, 0.2);
  }

  :active {
    transform: translateY(-1px) scale(1.1);
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
