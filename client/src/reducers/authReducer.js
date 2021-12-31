import {
  REGISTER_SUCCESS,
  REGISTER_FAIL,
  TECH_LOADED,
  AUTH_ERROR,
  LOGIN_SUCCESS,
  LOGIN_FAIL,
  LOGOUT
  // CLEAR_ERRORS
} from '../actions/types';

const initialState = {
  token: localStorage.getItem('token'),
  isAuthenticated: null,
  loading: true,
  error: null,
  tech: null
};

// eslint-disable-next-line import/no-anonymous-default-export
export default (state = initialState, action) => {
  const { type, payload } = action;

  switch (type) {
    case TECH_LOADED:
      return {
        ...state,
        isAuthenticated: true,
        loading: false,
        tech: payload
      };
    case REGISTER_SUCCESS:
    case LOGIN_SUCCESS:
      //* take and spread the current state with token (action.payload)
      return {
        ...state,
        ...payload,
        isAuthenticated: true,
        loading: false
      };
    case REGISTER_FAIL:
    case AUTH_ERROR:
    case LOGIN_FAIL:
    case LOGOUT:
      return {
        ...state,
        token: null,
        isAuthenticated: false,
        loading: false,
        tech: null,
        //* The new payload is error msg, see authActions and routes/tech.js ln 49
        error: payload
      };
    // case CLEAR_ERRORS:
    // return {
    //   ...state,
    //   error: null
    // };

    default:
      return state;
  }
};
