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

// *SET LOADING TO TRUE
export const setLoading = () => {
  return {
    type: SET_LOADING
  };
};
