import axios from 'axios';
import { reset } from 'redux-form';

import {
  FETCHING_POST,
  SET_POSTS,
  UPDATE_POST,
  REMOVE_POST,
  SET_SELECTEDTAG
} from './types';
import { setErrors } from './errors.action';

export const getPosts = () => async dispatch => {
  try {
    dispatch({ type: FETCHING_POST });
    const res = await axios.get('/api/posts');
    dispatch({
      type: SET_POSTS,
      payload: res.data
    });
  } catch (err) {
    dispatch(setErrors(err.response.data));
  }
};

export const createPost = postData => async dispatch => {
  try {
    const res = await axios.post('/api/posts', postData);
    dispatch({
      type: UPDATE_POST,
      payload: res.data
    });
    dispatch(reset('postForm'));
    dispatch(setErrors()); // Clear error messages after successfully creating post
  } catch (err) {
    dispatch(setErrors(err.response.data));
  }
};

export const deletePost = postId => async dispatch => {
  try {
    await axios.delete(`/api/posts/${postId}`);
    dispatch({
      type: REMOVE_POST,
      payload: postId
    });
  } catch (err) {
    dispatch(setErrors(err.response.data));
  }
};

export const getPost = postId => async dispatch => {
  dispatch({ type: FETCHING_POST });
  try {
    const res = await axios.get(`/api/posts/${postId}`);
    dispatch({
      type: UPDATE_POST,
      payload: res.data
    });
  } catch (err) {
    dispatch(setErrors(err.response.data));
  }
};

export const addLike = postId => async dispatch => {
  try {
    const res = await axios.post(`/api/posts/like/${postId}`);
    dispatch({
      type: UPDATE_POST,
      payload: res.data
    });
  } catch (err) {
    dispatch(setErrors(err.response.data));
  }
};

export const removeLike = postId => async dispatch => {
  try {
    const res = await axios.post(`/api/posts/unlike/${postId}`);
    dispatch({
      type: UPDATE_POST,
      payload: res.data
    });
  } catch (err) {
    dispatch(setErrors(err.response.data));
  }
};

export const addComment = (postId, commentData) => async dispatch => {
  try {
    const res = await axios.post(`/api/posts/comment/${postId}`, commentData);
    dispatch({
      type: UPDATE_POST,
      payload: res.data
    });
    dispatch(reset('commentForm'));
    dispatch(setErrors());
  } catch (err) {
    dispatch(setErrors(err.response.data));
  }
};

export const deleteComment = (postId, commentId) => async dispatch => {
  try {
    const res = await axios.delete(`/api/posts/comment/${postId}/${commentId}`);
    dispatch({
      type: UPDATE_POST,
      payload: res.data
    });
  } catch (err) {
    dispatch(setErrors(err.response.data));
  }
};

export const selectTag = tag => {
  return {
    type: SET_SELECTEDTAG,
    payload: tag
  };
};
