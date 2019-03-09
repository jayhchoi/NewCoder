import _ from 'lodash';

import { FETCHING_PROFILE, SET_PROFILES, SET_PROFILE } from '../actions/types';

const initialState = {
  isFetching: false,
  profiles: {}, // object of objects
  profile: {}
};

export default (state = initialState, action) => {
  switch (action.type) {
    case FETCHING_PROFILE:
      return {
        ...state,
        isFetching: action.payload
      };
    case SET_PROFILES:
      return {
        ...state,
        profiles: { ..._.mapKeys(action.payload, '_id') },
        isFetching: false
      };
    case SET_PROFILE:
      return {
        ...state,
        profile: action.payload,
        isFetching: false
      };
    default:
      return state;
  }
};
