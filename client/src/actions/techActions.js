import api from '../utils/api';

import {
  GET_TECHS,
  ADD_TECH,
  DELETE_TECH,
  SET_LOADING,
  TECHS_ERROR,
} from './types';

// *GET TECHS FROM SERVER
export const getTechs = () => async (dispatch) => {
  // **THIS IS THE ASYNC THUNK FUNCTION
  try {
    console.log('get all the techs from techActions', getTechs)
    setLoading();

    // request the data
    const res = await api.get('/techs');

    // dispatch data to the reducer
    dispatch({
      type: GET_TECHS,
      payload: res.data
    });
  } catch (err) {
    dispatch({
      type: TECHS_ERROR,
      payload:   { msg: err.response.statusText, status: err.response.status }
      // err.response.msg
    });
  }
};

// *ADD A TECHNICIAN TO THE SERVER
export const addTech = (tech) => async (dispatch) => {
  // **THIS IS THE ASYNC THUNK FUNCTION
  try {
    console.log('add a tech', addTech);

    setLoading();

    // post the data to add a tech
    const res = await api.put('/techs', tech);
    // response of data formatted
    // const data = await res.json();//*!Not sure if I need this here

    // dispatch data to the reducer
    dispatch({
      type: ADD_TECH,
      payload: res.data
    });
  } catch (err) {
    dispatch({
      type: TECHS_ERROR,
      payload: err.response.msg
    });
  }
};

// *DELETE A TECH FROM THE SERVER
export const deleteTech = (id) => async (dispatch) => {
  // **THIS IS THE ASYNC THUNK FUNCTION
  try {
    console.log('delete a tech', deleteTech, id);

    setLoading();

    // request the data no variable needed to store, need id to delete from backend
    await api.delete(`/techs${id}`);

    // dispatch data (id) to the reducer from component
    dispatch({
      type: DELETE_TECH,
      payload: id
    });
  } catch (err) {
    dispatch({
      type: TECHS_ERROR,
      payload: err.response.msg
    });
  }
};

// *SET LOADING TO TRUE
export const setLoading = () => {
  return {
    type: SET_LOADING
  };
};
