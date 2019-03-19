import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Router, Route, Switch } from 'react-router-dom'
import PropTypes from 'prop-types'
import jwtDecode from 'jwt-decode'
import { createGlobalStyle } from 'styled-components'

import history from '../utils/history'
import setAuthToken from '../utils/setAuthToken'
import { logoutUser, setCurrentUser } from '../actions/auth.action'
import {
  Navbar,
  Footer,
  PrivateRoute,
  NotFound,
  HeaderTag
} from '../components'
import {
  Login,
  Register,
  Dashboard,
  Landing,
  CreateProfile,
  EditProfile,
  AddExperience,
  AddEducation,
  Profiles,
  ProfileDetail,
  Posts,
  PostDetail,
  About
} from '../pages'

const GlobalStyle = createGlobalStyle`
  * {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
  }

  body {
    font-family: 'Roboto', 'Noto Sans KR', sans-serif;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
  }
  
  code {
    font-family: source-code-pro, Menlo, Monaco, Consolas, 'Courier New',
      monospace;
  }

  ::placeholder {
    color: #bbb !important;
    font-style: italic;
  }

  .active-link {
    color: white !important;
  }

  @media only screen and (max-width: 600px) {
    h1 {
      font-size: 2.5rem !important;
    }
  
    .form-control {
      font-size: 1rem;
    }
  
    .author {
      font-weight: bold;
    }
  }
`

class App extends Component {
  componentWillMount() {
    // Check for local token when refreshed AND keep user logged in
    if (localStorage.getItem('jwt')) {
      const token = localStorage.getItem('jwt')
      setAuthToken(token)

      const decoded = jwtDecode(token)
      this.props.setCurrentUser(decoded)

      // Logout user when token expires
      if (decoded.exp < Date.now() / 1000) {
        this.props.logoutUser()
        window.location.href = '/login' // Traditional a tag href
      }
    }
  }

  render() {
    return (
      <Router history={history}>
        <div id="app">
          <GlobalStyle />
          <HeaderTag />
          <Navbar />
          <Switch>
            {/* PUBLIC ROUTES */}
            <Route exact path="/" component={Landing} />
            <Route exact path="/about" component={About} />
            <Route
              exact
              path="/register"
              render={props => <Register {...props} />}
            />
            <Route exact path="/login" render={props => <Login {...props} />} />
            <Route exact path="/profiles" component={Profiles} />
            <Route exact path="/profile/:handle" component={ProfileDetail} />

            {/* PRIVATE ROUTES */}
            <PrivateRoute exact path="/dashboard" component={Dashboard} />
            <PrivateRoute
              exact
              path="/create-profile"
              component={CreateProfile}
            />
            <PrivateRoute exact path="/edit-profile" component={EditProfile} />
            <PrivateRoute
              exact
              path="/add-experience"
              component={AddExperience}
            />
            <PrivateRoute
              exact
              path="/add-education"
              component={AddEducation}
            />
            <PrivateRoute exact path="/feed" component={Posts} />
            <PrivateRoute exact path="/post/:id" component={PostDetail} />

            {/* 404 */}
            <Route component={NotFound} />
          </Switch>
          <Footer />
        </div>
      </Router>
    )
  }
}

App.propTypes = {
  logoutUser: PropTypes.func.isRequired,
  setCurrentUser: PropTypes.func.isRequired
}

export default connect(
  null,
  {
    logoutUser,
    setCurrentUser
  }
)(App)
