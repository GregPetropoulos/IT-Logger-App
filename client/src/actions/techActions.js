import {
  GET_TECHS,
  ADD_TECH,
  DELETE_TECH,
  SET_LOADING,
  TECHS_ERROR
} from './types';

// *GET TECHS FROM SERVER
export const getTechs = () => async (dispatch) => {
  // **THIS IS THE ASYNC THUNK FUNCTION
  try {
    setLoading();

    // request the data
    const res = await fetch('/techs');
    // response of data formatted
    const data = await res.json();

    // dispatch data to the reducer
    dispatch({
      type: GET_TECHS,
      payload: data
    });
  } catch (err) {
    dispatch({
      type: TECHS_ERROR,
      payload: err.response.statusText
    });
  }
};

// *ADD A TECHNICIAN TO THE SERVER
export const addTech = (tech) => async (dispatch) => {
  // **THIS IS THE ASYNC THUNK FUNCTION
  try {
    setLoading();

    // post the data to add a tech
    const res = await fetch('/techs', {
      method: 'POST',
      body: JSON.stringify(tech),
      headers: { 'Content-Type': 'application/json' }
    });
    // response of data formatted
    const data = await res.json();

    // dispatch data to the reducer
    dispatch({
      type: ADD_TECH,
      payload: data
    });
  } catch (err) {
    dispatch({
      type: TECHS_ERROR,
      payload: err.response.statusText
    });
  }
};

// *DELETE A TECH FROM THE SERVER
export const deleteTech = (id) => async (dispatch) => {
  // **THIS IS THE ASYNC THUNK FUNCTION
  try {
    setLoading();

    // request the data no variable needed to store, need id to delete from backend
    await fetch(`/techs/${id}`, {
      method: 'DELETE'
    });

    // dispatch data (id) to the reducer from component
    dispatch({
      type: DELETE_TECH,
      payload: id
    });
  } catch (err) {
    dispatch({
      type: TECHS_ERROR,
      payload: err.response.statusText
    });
  }
};

// *SET LOADING TO TRUE
export const setLoading = () => {
  return {
    type: SET_LOADING
  };
};
