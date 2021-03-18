import {
  UPDATE_PROFILE,
  GET_PROFILE,
  PROFILE_ERROR,
  CLEAR_PROFILE,
  GET_PROFILES,
  GET_REPOS,
} from '../actions/types';

const initialState = {
  profile: null,
  profiles: [],
  repos: null,
  loading: true,
  error: null,
};

export default (state = initialState, action) => {
  const { type, payload } = action;

  switch (type) {
    case GET_PROFILE:
    case UPDATE_PROFILE:
      return { ...state, profile: payload, loading: false, error: null };
    case GET_PROFILES:
      return { ...state, loading: false, profiles: payload, error: null };
    case PROFILE_ERROR:
      return { ...state, error: payload, loading: false };
    case CLEAR_PROFILE:
      return {
        ...state,
        profile: null,
        repos: null,
        loading: false,
        error: null,
      };

    case GET_REPOS:
      return { ...state, repos: payload, loading: false, error: null };
    default:
      return state;
  }
};
