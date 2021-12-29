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
  CLEAR_FILTER
} from '../actions/types';

// * When we make request to json server it will fill with array of Logs, but initially it's null here
const initialState = {
  logs: null,
  current: null,
  loading: false,
  filtered:null,
  error: null
};

// eslint-disable-next-line import/no-anonymous-default-export
export default (state = initialState, action) => {
  switch (action.type) {
    case GET_LOGS:
      return {
        ...state,
        logs: action.payload,
        loading: false
      };
    case ADD_LOG:
      return {
        ...state,
        logs: [...state.logs, action.payload],
        loading: false
      };

    case DELETE_LOG:
      return {
        ...state,
        logs: state.logs.filter((log) => log.id !== action.payload),
        loading: false
      };
    case UPDATE_LOG:
      return {
        ...state,
        logs: state.logs.map((log) =>
          log.id === action.payload.id ? action.payload : log
        ),
        loading: false
      };
    case SEARCH_LOGS:
      return {
        ...state,
        logs: action.payload
      };
    case SET_CURRENT:
      return {
        ...state,
        current: action.payload
      };

    case CLEAR_CURRENT:
      return {
        ...state,
        current: null
      };
    case SET_LOADING:
      return {
        ...state,
        loading: true
      };
    case LOGS_ERROR:
      console.error(action.payload);
      return {
        ...state,
        error: action.payload
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
