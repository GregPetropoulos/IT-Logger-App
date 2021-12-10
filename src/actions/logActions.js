// *Bring in the types and middleware(thunk) for backend calls

import { GET_LOGS, SET_LOADING, LOGS_ERROR } from './types';

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

// **REFACTORED VERSION**-------------------------
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
      payload: err.response.data
    });
  }
};
// **REFACTORED VERSION**-------------------------

//* A CB Sets the loading and will be executed in getLogs to be true until the we get the data back, no thunk in this function, not async
export const setLoading = () => {
  return {
    type: SET_LOADING
  };
};
