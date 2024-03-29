import api from '../utils/api';

// *Bring in the types and middleware(thunk) for backend calls
import {
  GET_LOGS,
  SET_LOADING,
  LOGS_ERROR,
  ADD_LOG,
  DELETE_LOG,
  UPDATE_LOG,
  SET_CURRENT,
  CLEAR_CURRENT,
  CLEAR_FILTER,
  FILTER_LOGS
} from './types';

// *This a description of how the getLogs works with REDUX
// *Normally return an object direct to reducer such as type: GET_LOGS
// *Thunk (middleware) allows us to return a function and will need it for async call to backend
// * Thunk function gets passed into dispatch method to reducer at anytime, example-makes request to backend then sends response to thunk>reducer



//*GET ALL LOGS FROM THE SERVER /
export const getLogs = () => async (dispatch) => {
  // **THIS IS THE ASYNC THUNK FUNCTION
  try {

    // setLoading();

    // request the data through axios
    const res = await api.get('/logs');

    // dispatch data to the reducer
    dispatch({
      type: GET_LOGS,
      payload: res.data
    });
  } catch (err) {
    dispatch({
      type: LOGS_ERROR,
      payload:
        // err.response.data.msg

        // err.response.msg
        //*! need to check these responses
        // err.response.statusText

        { msg: err.response.statusText, status: err.response.status }
    });
  }
};

//* ADD A NEW LOG
export const addLog = (log) => async (dispatch) => {
  // **THIS IS THE ASYNC THUNK FUNCTION
  try {

    // setLoading();

    // request the data with axios post
    const res = await api.post('/logs', log);

    // dispatch data to the reducer
    dispatch({
      type: ADD_LOG,
      payload: res.data
    });
  } catch (err) {
    dispatch({
      type: LOGS_ERROR,
      payload: err.response.msg
    });
  }
};

//* DELETE A LOG FROM THE SERVER
export const deleteLog = (id) => async (dispatch) => {
  // **THIS IS THE ASYNC THUNK FUNCTION
  try {


    setLoading();

    // Dont need to store in variable
    await api.delete(`/logs/${id}`);

    // dispatch data to the reducer
    dispatch({
      type: DELETE_LOG,
      payload: id
    });
  } catch (err) {
    dispatch({
      type: LOGS_ERROR,
      payload: err.response.msg
    });
  }
};

//* UPDATE A LOG ON THE SERVER
export const updateLog = (log) => async (dispatch) => {
  // **THIS IS THE ASYNC THUNK FUNCTION
  try {


    // setLoading();
    const res = await api.put(`/logs/${log.id}`, log);

    // dispatch data to the reducer
    dispatch({
      type: UPDATE_LOG,
      payload: res.data
    });
  } catch (err) {
    dispatch({
      type: LOGS_ERROR,
      payload: err.response.msg
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

// *!ADD IN -----------------
export const filterLogs = (text) => (dispatch) => {
  //* Display will send the action.type, payload data is the text entered by the user for the search of contacts
  try {
    dispatch({
      type: FILTER_LOGS,
      payload: text
    });
  } catch (err) {
    dispatch({
      type: LOGS_ERROR,
      payload: err.response.msg
    });
  }
};

//* CLEAR FILTER
export const clearFilter = () => {
  return {
    type: CLEAR_FILTER
  };
};
