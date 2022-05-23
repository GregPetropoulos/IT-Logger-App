import api from '../utils/api';
import {
  REGISTER_SUCCESS,
  REGISTER_FAIL,
  TECH_LOADED,
  AUTH_ERROR,
  LOGIN_SUCCESS,
  LOGIN_FAIL,
  LOGOUT
  // CLEAR_ERRORS
} from './types';

//* LOAD TECH get tech data from back end and put in the state to validate authentication to access home page etc
export const loadTech = () => async (dispatch) => {
  try {
    // console.log('loadTech', loadTech);

    //* route checking token for valid tech
    const res = await api.get('/auth');

    //* payload is the techs data
    dispatch({ type: TECH_LOADED, payload: res.data });
  } catch (err) {
    dispatch({ type: AUTH_ERROR });
  }
};

//* REGISTER USER to the backend handling token from routes/users.js
export const register = (formData) => async (dispatch) => {
  try {
    // console.log('register a tech', register);

    //* This response takes in url, formData and then returns a promise
    const res = await api.post('/techs', formData);

    //* Tell reducer the type and payload is the response which is the token
    dispatch({
      type: REGISTER_SUCCESS,
      payload: res.data
    });
    //* The loadTech() is grabbing the user from the db backend via token>dispatch the res.data
    // loadTech(dispatch);
    dispatch(loadTech());
  } catch (err) {
    dispatch({
      type: REGISTER_FAIL,
      payload: err.response.data.msg
    });
  }
};

//* LOGIN USER
export const login = (email, password) => async (dispatch) => {
  try {
    // console.log('login a tech', login);
    const body = { email, password };
    const res = await api.post('/auth', body);

    dispatch({
      type: LOGIN_SUCCESS,
      payload: res.data
    });
    dispatch(loadTech());
  } catch (err) {
    dispatch({
      type: LOGIN_FAIL,
      payload: err.response.data.msg
    });
  }
};

//* LOGOUT
export const logout = () => ({ type: LOGOUT });

//*! CLEAR ERRORS
// *! export const clearErrors = (dispatch) => dispatch({ type: CLEAR_ERRORS });
