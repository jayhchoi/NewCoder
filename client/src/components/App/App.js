import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Router, Route, Switch } from 'react-router-dom'
import PropTypes from 'prop-types'
import jwtDecode from 'jwt-decode'

import history from '../../utils/history'
import setAuthToken from '../../utils/setAuthToken'
import { logoutUser, setCurrentUser } from '../../actions/auth.action'
import {
  Navbar,
  Footer,
  PrivateRoute,
  NotFound,
  HeaderTag
} from '../../components'
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
} from '../../pages'

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
        <>
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
        </>
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
