import {
  GET_TECHS,
  ADD_TECH,
  DELETE_TECH,
  SET_LOADING,
  TECHS_ERROR
} from '../actions/types';

const initialState = {
  techs: null,
  loading: false,
  error: null
};

// eslint-disable-next-line import/no-anonymous-default-export
export default (state = initialState, action) => {
  const {type, payload}= action

  switch (type) {
    case GET_TECHS:
      return {
        ...state,
        techs: payload,
        loading: false
      };
    //* Spread current state, set array with copy of current techs and add the new tech into the array
    case ADD_TECH:
      return {
        ...state,
        techs: [...state.techs,payload],
        loading: false
      };
      case DELETE_TECH:
        return {
          ...state,
          techs:state.techs.filter(tech => tech.id !== payload),
        loading: false
        }
    case SET_LOADING:
      return {
        ...state,
        loading: true
      };
    case TECHS_ERROR:
      console.error(payload);
      return {
        ...state,
        error: payload,
        loading: false
      };
    default:
      return state;
  }
};
