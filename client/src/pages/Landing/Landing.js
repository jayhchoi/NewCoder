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
        <DarkOverlay>
          <div className="container">
            <div className="row">
              <div className="col-md-12 text-center">
                <h1 className="display-4 mt-5">Just keep coding</h1>
                <h5 className="mt-4">코딩 새내기들의 소셜네트워크</h5>
                <div className="mt-4">
                  <Link to="/register" className="btn btn-lg btn-info mr-2">
                    회원가입
                  </Link>
                  <Link to="/login" className="btn btn-lg btn-light">
                    로그인
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </DarkOverlay>
      </LandingPage>
    )
  }
}

const DarkOverlay = styled.div`
  background-color: rgba(0, 0, 0, 0.6);
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  color: white;
`

const LandingPage = styled(Page)`
  position: relative;
  background: url(${landingBackground}) no-repeat;
  background-size: cover;
  background-position: center;
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
