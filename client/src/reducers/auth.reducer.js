import jwtDecode from 'jwt-decode';

import { SET_CURRENT_USER } from '../actions/types';

const initialState = {
  isAuthenticated: false,
  user: {}
};

// Check for local token when refreshed AND keep user logged in if token exists
if (localStorage.getItem('jwt')) {
  const user = jwtDecode(localStorage.getItem('jwt'));
  initialState.isAuthenticated = true;
  initialState.user = user;
}

export default (state = initialState, action) => {
  switch (action.type) {
    case SET_CURRENT_USER:
      return {
        ...state,
        isAuthenticated: Object.keys(action.payload).length !== 0, // False if payload is empty
        user: action.payload
      };
    default:
      return state;
  }
};
