// *Bring in the types and middleware(thunk) for backend calls

import {
  GET_LOGS,
  SET_LOADING,
  LOGS_ERROR,
  ADD_LOG,
  SET_CURRENT,
  CLEAR_CURRENT,
  UPDATE_LOG,
  DELETE_LOG
} from './types';

// *This a description of how the getLogs works with REDUX
// *Normally return an object direct to reducer such as type: GET_LOGS
// *Thunk (middleware) allows us to return a function and will need it for async call to backend
// * Thunk function gets passed into dispatch method to reducer at anytime, example-makes request to backend then sends response to thunk>reducer

// *!NON-REFACTORED VERSION-----------------
// export const getLogs = () => {
//   // **THIS IS THE ASYNC THUNK FUNCTION
//   return async (dispatch) => {
//     setLoading();

//     // request the data
//     const res = await fetch('/logs');
//     // format the data response
//     const data = await res.json();

//     // dispatch it to the reducer
//     dispatch({
//         type:GET_LOGS,
//         payload:data
//     })
//   };
// };
// *!NON-REFACTORED VERSION-------------------

//*GET ALL LOGS FROM THE SERVER /
// **-----REFACTORED VERSION**-------------------------
export const getLogs = () => async (dispatch) => {
  // **THIS IS THE ASYNC THUNK FUNCTION
  try {
    setLoading();

    // request the data
    const res = await fetch('/logs');
    // response of data formatted
    const data = await res.json();

    // dispatch data to the reducer
    dispatch({
      type: GET_LOGS,
      payload: data
    });
  } catch (err) {
    dispatch({
      type: LOGS_ERROR,
      payload: err.response.statusText
    });
  }
};
// **------REFACTORED VERSION**-------------------------

//* ADD A NEW LOG
export const addLog = (log) => async (dispatch) => {
  // **THIS IS THE ASYNC THUNK FUNCTION
  try {
    setLoading();

    // request the data with fetch post
    const res = await fetch('/logs', {
      method: 'POST',
      body: JSON.stringify(log),
      headers: {
        'Content-Type': 'application/json'
      }
    });
    // response of data formatted
    const data = await res.json();

    // dispatch data to the reducer
    dispatch({
      type: ADD_LOG,
      payload: data
    });
  } catch (err) {
    dispatch({
      type: LOGS_ERROR,
      payload: err.response.statusText
    });
  }
};

//* DELETE A LOG FROM THE SERVER
export const deleteLog = (id) => async (dispatch) => {
  // **THIS IS THE ASYNC THUNK FUNCTION
  try {
    setLoading();

    // Dont need to store in variable
    await fetch(`/logs/${id}`, {
      method: 'DELETE'
    });

    // dispatch data to the reducer
    dispatch({
      type: DELETE_LOG,
      payload: id
    });
  } catch (err) {
    dispatch({
      type: LOGS_ERROR,
      payload: err.response.statusText
    });
  }
};

//* UPDATE A LOG ON THE SERVER
export const updateLog = (log) => async (dispatch) => {
  // **THIS IS THE ASYNC THUNK FUNCTION
  try {
    setLoading();

    const res = await fetch(`/logs/${log.id}`, {
      method: 'PUT',
      body: JSON.stringify(log),
      headers: {
        'Content-type': 'application/json'
      }
    });
    const data = await res.json();
    // dispatch data to the reducer
    dispatch({
      type: UPDATE_LOG,
      payload: data
    });
  } catch (err) {
    dispatch({
      type: LOGS_ERROR,
      payload: err.response.statusText
    });
  }
};

//* SET A CURRENT LOG
export const setCurrent = (log) => {
  return {
    type: SET_CURRENT,
    payload: log
  };
};

//* CLEAR A CURRENT LOG
export const clearCurrent = () => {
  return {
    type: CLEAR_CURRENT
  };
};

//* A CB Sets the loading and will be executed in getLogs to be true until the we get the data back, no thunk in this function, not async
export const setLoading = () => {
  return {
    type: SET_LOADING
  };
};
