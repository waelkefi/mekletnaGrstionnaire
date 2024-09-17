// planification.reducer.js
import {
  CREATE_PLANIFICATION_SUCCESS,
  FETCH_PLANIFICATION_BY_ID_SUCCESS,
  UPDATE_PLANIFICATION_SUCCESS,
  DELETE_PLANIFICATION_SUCCESS,
  FETCH_PLANIFICATIONS_BY_DATE_SUCCESS,
  GET_PLANIFICATIONS_SUCCESS
} from '../actions/PlanificationAction';

const initialState = {
  planifications: [],
  planification: null,
};

const PlanificationReducer = (state = initialState, action) => {
  switch (action.type) {
    case CREATE_PLANIFICATION_SUCCESS:
      return {
        ...state,
        planifications: [...state.planifications, action.payload],
      };
    case GET_PLANIFICATIONS_SUCCESS:
      return {
        ...state,
        planifications: action.payload,
      };
    case FETCH_PLANIFICATION_BY_ID_SUCCESS:
      return {
        ...state,
        planification: action.payload,
      };

    case UPDATE_PLANIFICATION_SUCCESS:
      return {
        ...state,
        planifications: state.planifications.map((planif) =>
          planif._id === action.payload._id ? action.payload : planif
        ),
      };

    case DELETE_PLANIFICATION_SUCCESS:
      return {
        ...state,
        planifications: state.planifications.filter(
          (planif) => planif._id !== action.payload
        ),
      };

    case FETCH_PLANIFICATIONS_BY_DATE_SUCCESS:
      return {
        ...state,
        planifications: action.payload,
      };

    default:
      return state;
  }
};

export default PlanificationReducer;
