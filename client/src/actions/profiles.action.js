import axios from 'axios';

import { FETCHING_PROFILE, SET_PROFILES, SET_PROFILE } from './types';
import { setCurrentUser } from './auth.action';
import { setErrors } from './errors.action';
import { history } from '../utils';

export const getProfiles = () => async dispatch => {
  try {
    dispatch(fetchingProfile(true));
    const res = await axios.get('/api/profile/all');
    dispatch({
      type: SET_PROFILES,
      payload: res.data
    });
  } catch (err) {
    dispatch(fetchingProfile(false));
    dispatch(setErrors(err.response.data));
  }
};

export const getCurrentProfile = () => async dispatch => {
  try {
    dispatch(fetchingProfile(true));
    const res = await axios.get('/api/profile');
    dispatch({
      type: SET_PROFILE,
      payload: res.data
    });
  } catch (err) {
    dispatch(fetchingProfile(false));
    dispatch(setErrors(err.response.data));
  }
};

export const getProfileByHandle = handle => async dispatch => {
  try {
    dispatch(fetchingProfile(true));
    const res = await axios.get(`/api/profile/handle/${handle}`);
    dispatch({
      type: SET_PROFILE,
      payload: res.data
    });
  } catch (err) {
    dispatch(fetchingProfile(false));
    dispatch(setErrors(err.response.data));
  }
};

export const createProfile = profileData => async dispatch => {
  try {
    await axios.post('/api/profile', profileData);
    history.push('/dashboard');
  } catch (err) {
    dispatch(setErrors(err.response.data));
  }
};

export const addExperience = expData => async dispatch => {
  try {
    await axios.post('/api/profile/experience', expData);
    history.push('/dashboard');
  } catch (err) {
    dispatch(setErrors(err.response.data));
  }
};

export const deleteExperience = expId => async dispatch => {
  try {
    const res = await axios.delete(`api/profile/experience/${expId}`);
    dispatch({
      type: SET_PROFILE,
      payload: res.data
    });
  } catch (err) {
    dispatch(setErrors(err.response.data));
  }
};

export const addEducation = eduData => async dispatch => {
  try {
    await axios.post('/api/profile/education', eduData);
    history.push('/dashboard');
  } catch (err) {
    dispatch(setErrors(err.response.data));
  }
};

export const deleteEducation = eduId => async dispatch => {
  try {
    const res = await axios.delete(`api/profile/education/${eduId}`);
    dispatch({
      type: SET_PROFILE,
      payload: res.data
    });
  } catch (err) {
    dispatch(setErrors(err.response.data));
  }
};

export const deleteAccount = () => async dispatch => {
  if (window.confirm('Are you sure?')) {
    try {
      await axios.delete('/api/profile');
      dispatch(setCurrentUser({}));
      history.push('/');
    } catch (err) {
      dispatch(setErrors(err.response.data));
    }
  }
};

export const fetchingProfile = bool => ({
  type: FETCHING_PROFILE,
  payload: bool
});
