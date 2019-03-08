// Libraries
import axios from 'axios';
import jwtDecode from 'jwt-decode';

// src
import { SET_CURRENT_USER } from './types';
import { setAuthToken, history } from '../utils';
import { setErrors } from './errors.action';

export const registerUser = userData => async dispatch => {
  try {
    await axios.post('/api/users/register', userData);
    history.push('/login');
  } catch (err) {
    dispatch(setErrors(err.response.data));
  }
};

export const loginUser = userData => async dispatch => {
  try {
    const res = await axios.post('/api/users/login', userData);
    const { token } = res.data;

    localStorage.setItem('jwt', token);
    setAuthToken(token); // Set HTTP auth header

    const decoded = jwtDecode(token);
    dispatch(setCurrentUser(decoded));

    history.push('/dashboard');
  } catch (err) {
    dispatch(setErrors(err.response.data));
  }
};

export const logoutUser = () => {
  localStorage.removeItem('jwt');
  setAuthToken(false); // Unset HTTP auth header

  return setCurrentUser({}); // Unset user
};

export const setCurrentUser = user => {
  return {
    type: SET_CURRENT_USER,
    payload: user
  };
};
