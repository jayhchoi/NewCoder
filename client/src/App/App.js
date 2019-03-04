// REACT
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Router, Route, Switch } from 'react-router-dom';
import PropTypes from 'prop-types';
import { Helmet } from 'react-helmet';

// OTHER LIBRARIES
import jwtDecode from 'jwt-decode';

// UTILS
import history from '../utils/history';
import setAuthToken from '../utils/setAuthToken';

// ACTIONS
import { logoutUser, setCurrentUser } from '../actions/auth.action';

// STYLES
import './App.css';
import logo from '../img/newcoder_logo.png';

// COMPONENTS
import { Navbar, Footer, PrivateRoute, NotFound } from '../components';

// CONTAINERS
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
  PostDetail
} from '../containers';

class App extends Component {
  componentWillMount() {
    // Check for local token when refreshed AND keep user logged in
    if (localStorage.jwt) {
      const token = localStorage.jwt;
      setAuthToken(token);
      const decoded = jwtDecode(token);

      this.props.setCurrentUser(decoded);

      // Logout user when token expires
      if (decoded.exp < Date.now() / 1000) {
        this.props.logoutUser();
        window.location.href = '/login'; // Traditional a tag href
      }
    }
  }

  render() {
    return (
      <Router history={history}>
        <div className="App">
          <Helmet>
            <title>NewCoder | Keep Coding</title>
            <link rel="canonical" href="http://newcoder.org" />
            <meta name="description" content="코딩 입문자들을 위한 커뮤니티" />
            <meta
              name="keywords"
              content="뉴코더, NewCoder, 코딩, 개발자, 커뮤니티"
            />
            <meta
              property="og:title"
              content="NewCoder | 코딩 입문자들을 위한 커뮤니티"
            />
            <meta property="og:type" content="website" />
            <meta property="og:url" content="http://www.newcoder.org" />
            <meta property="og:image" content={logo} />
          </Helmet>
          <Navbar />
          <Switch>
            <Route exact path="/" component={Landing} />
            <Route
              exact
              path="/register"
              render={props => <Register {...props} />}
            />
            <Route exact path="/login" render={props => <Login {...props} />} />
            <Route exact path="/profiles" component={Profiles} />
            <Route exact path="/profile/:handle" component={ProfileDetail} />
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
            <Route component={NotFound} />
          </Switch>
          <Footer />
        </div>
      </Router>
    );
  }
}

App.propTypes = {
  logoutUser: PropTypes.func.isRequired,
  setCurrentUser: PropTypes.func.isRequired
  // auth: PropTypes.object.isRequired
};

// const mapStateToProps = state => {
//   return {
//     auth: state.auth
//   };
// };

export default connect(
  null,
  {
    logoutUser,
    setCurrentUser
  }
)(App);
