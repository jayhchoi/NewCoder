import _ from 'lodash';
import {
  FETCHING_POST,
  SET_POSTS,
  UPDATE_POST,
  REMOVE_POST,
  SET_SELECTEDTAG
} from '../actions/types';

const initialState = {
  isFetching: false,
  posts: {}, // Object of objects with key of post id
  selectedTag: null
};

export default (state = initialState, action) => {
  switch (action.type) {
    case FETCHING_POST:
      return {
        ...state,
        isFetching: true
      };
    case SET_POSTS:
      // Rest API returns arraay of objects
      // Convert this to object of objects for convenience
      return {
        ...state,
        posts: { ..._.mapKeys(action.payload, '_id') }, // array of objects to object of objects
        isFetching: false
      };
    case UPDATE_POST:
      return {
        ...state,
        posts: { ...state.posts, [action.payload._id]: action.payload },
        isFetching: false
      };
    case REMOVE_POST:
      return {
        ...state,
        posts: _.omit(state.posts, action.payload),
        isFetching: false
      };
    case SET_SELECTEDTAG:
      return {
        ...state,
        selectedTag: action.payload
      };
    default:
      return state;
  }
};
