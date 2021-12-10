// **No State file like in context, set initial state here

// *Actions types see logActions for functions
import { GET_LOGS, SET_LOADING, LOGS_ERROR } from '../actions/types';

// * When we make request to json server it will fill with array of Logs, but initially it's null here
const initialState = {
  logs: null,
  current: null,
  loading: false,
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
    default:
      return state;
  }
};
