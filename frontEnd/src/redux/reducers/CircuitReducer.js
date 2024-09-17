// circuitReducer.js

import {
  GET_ALL_CIRCUITS,
  GET_CIRCUIT_BY_ID,
  ADD_CIRCUIT,
  UPDATE_CIRCUIT,
  DELETE_CIRCUIT,
  GET_CIRCUITS_BY_DATE,
  GET_CIRCUITS_BY_LIVREUR
} from '../actions/CircuitAction';


const initialState = {
  circuits: [],
  circuit: null,
  circuitsByDate: [],
  circuitsByLivreur: []
};

const circuitReducer = (state = initialState, action) => {
  switch (action.type) {
    case GET_ALL_CIRCUITS:
      return {
        ...state,
        circuits: action.payload,
      };

    case GET_CIRCUIT_BY_ID:
      return {
        ...state,
        circuit: action.payload,
      };

    case ADD_CIRCUIT:
      return {
        ...state,
        circuits: [...state.circuits, action.payload],
      };

    case UPDATE_CIRCUIT:
      return {
        ...state,
        circuits: state.circuits.map((circuit) =>
          circuit._id === action.payload._id ? action.payload : circuit
        ),
      };

    case DELETE_CIRCUIT:
      return {
        ...state,
        circuits: state.circuits.filter((circuit) => circuit._id !== action.payload),
      };
    case GET_CIRCUITS_BY_DATE:
      return {
        ...state,
        circuitsByDate: action.payload,
      };
    case GET_CIRCUITS_BY_LIVREUR:
      return {
        ...state,
        circuitsByLivreur: action.payload
      };
    default:
      return state;
  }
};

export default circuitReducer;
