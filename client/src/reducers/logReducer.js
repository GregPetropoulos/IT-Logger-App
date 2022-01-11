// **No State file like in context, set initial state here

// *Actions types see logActions for functions
import {
  GET_LOGS,
  SET_LOADING,
  LOGS_ERROR,
  ADD_LOG,
  DELETE_LOG,
  UPDATE_LOG,
  SEARCH_LOGS,
  SET_CURRENT,
  CLEAR_CURRENT,
  CLEAR_LOGS,
  CLEAR_FILTER,
  // FILTER_LOGS
} from '../actions/types';

// * When we make request to json server it will fill with array of Logs, but initially it's null here
const initialState = {
  logs: null,
  current: null,
  loading: true,
  filtered: null,
  error: null
};

// eslint-disable-next-line import/no-anonymous-default-export
export default (state = initialState, action) => {
  const { type, payload } = action;
  switch (type) {
    case GET_LOGS:
      return {
        ...state,
        logs: payload,
        loading: false
      };
    case ADD_LOG:
      return {
        ...state,
        logs: [...state.logs, payload],
        loading: false
      };

    case DELETE_LOG:
      return {
        ...state,
        logs: state.logs.filter((log) => log.id !== payload),
        loading: false
      };
    case UPDATE_LOG:
      return {
        ...state,
        logs: state.logs.map((log) => (log._id === payload.id ? payload : log)),
        loading: false
      };
    case SEARCH_LOGS:
      return {
        ...state,
        logs: payload
      };
    case SET_CURRENT:
      return {
        ...state,
        current: payload
      };

    case CLEAR_CURRENT:
      return {
        ...state,
        current: null
      };
    case SET_LOADING:
      return {
        ...state,
        loading: false
      };
    case LOGS_ERROR:
      console.error(payload);
      return {
        ...state,
        error: payload
      };
    case CLEAR_FILTER:
      return {
        ...state,
        //* return filtered back to null and clears the form
        filtered: null
      };
    case CLEAR_LOGS:
      return {
        ...state,
        logs: null,
        current: null,
        filtered: null,
        loading: false,
        error: null
      };
    default:
      return state;
  }
};
