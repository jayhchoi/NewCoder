import axios from 'axios';
import { reset } from 'redux-form';

import {
  CREATE_POST,
  GET_POSTS,
  FETCHING_POSTS,
  CLEAR_POSTS,
  DELETE_POST,
  GET_POST
} from './types';

import { setErrors } from './errors.action';

export const createPost = postData => async dispatch => {
  try {
    const res = await axios.post('/api/posts', postData);
    dispatch({
      type: CREATE_POST,
      payload: res.data
    });
    dispatch(reset('postForm'));
  } catch (err) {
    dispatch(setErrors(err.response.data));
  }
};

export const deletePost = postId => async dispatch => {
  try {
    await axios.delete(`/api/posts/${postId}`);
    dispatch({
      type: DELETE_POST,
      payload: postId
    });
  } catch (err) {
    dispatch(setErrors(err.response.data));
  }
};

export const getPosts = () => async dispatch => {
  dispatch({ type: FETCHING_POSTS });
  try {
    const res = await axios.get('/api/posts');
    dispatch({
      type: GET_POSTS,
      payload: res.data
    });
  } catch (err) {
    dispatch(setErrors(err.response.data));
    dispatch({
      type: CLEAR_POSTS
    });
  }
};

export const getPost = postId => async dispatch => {
  dispatch({ type: FETCHING_POSTS });
  try {
    const res = await axios.get(`/api/posts/${postId}`);
    dispatch({
      type: GET_POST,
      payload: res.data
    });
  } catch (err) {
    dispatch(setErrors(err.response.data));
    dispatch({
      type: CLEAR_POSTS
    });
  }
};

export const addLike = postId => async dispatch => {
  try {
    await axios.post(`/api/posts/like/${postId}`);
    const res = await axios.get('/api/posts');
    dispatch({
      type: GET_POSTS,
      payload: res.data
    });
  } catch (err) {
    dispatch(setErrors(err.response.data));
    dispatch({
      type: CLEAR_POSTS
    });
  }
};

export const removeLike = postId => async dispatch => {
  try {
    await axios.post(`/api/posts/unlike/${postId}`);
    const res = await axios.get('/api/posts');
    dispatch({
      type: GET_POSTS,
      payload: res.data
    });
  } catch (err) {
    dispatch(setErrors(err.response.data));
    dispatch({
      type: CLEAR_POSTS
    });
  }
};

export const addComment = (postId, commentData) => async dispatch => {
  try {
    const res = await axios.post(`/api/posts/comment/${postId}`, commentData);
    dispatch({
      type: GET_POST,
      payload: res.data // This is updated post
    });
    dispatch(reset('commentForm'));
  } catch (err) {
    dispatch(setErrors(err.response.data));
  }
};

export const deleteComment = (postId, commentId) => async dispatch => {
  try {
    const res = await axios.delete(`/api/posts/comment/${postId}/${commentId}`);
    dispatch({
      type: GET_POST,
      payload: res.data // This is updated post
    });
  } catch (err) {
    dispatch(setErrors(err.response.data));
  }
};
