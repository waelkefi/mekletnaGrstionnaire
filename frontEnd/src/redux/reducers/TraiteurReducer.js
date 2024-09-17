// reducers/clientReducer.js

import {
    FETCH_ALL_TRAITEURS_SUCCESS,
    FETCH_TRAITEUR_BY_ID_SUCCESS,
    ADD_TRAITEUR_SUCCESS,
    UPDATE_TRAITEUR_SUCCESS,
    DELETE_TRAITEUR_SUCCESS,
  } from '../actions/TraiteurAction';
  
  const initialState = {
    traiteurs: [],
    selectedTraiteur: null,
  };
  
  const TraiteurReducer = (state = initialState, action) => {
    switch (action.type) {
      case FETCH_ALL_TRAITEURS_SUCCESS:
        return {
          ...state,
          traiteurs: action.payload,
        };
  
      case FETCH_TRAITEUR_BY_ID_SUCCESS:
        return {
          ...state,
          selectedTraiteur: action.payload,
        };
  
      case ADD_TRAITEUR_SUCCESS:
        return {
          ...state,
          traiteurs: [...state.traiteurs, action.payload],
        };
  
      case UPDATE_TRAITEUR_SUCCESS:
        return {
          ...state,
          traiteurs: state.traiteurs.map((traiteur) =>
            traiteur._id === action.payload._id ? action.payload : traiteur
          ),
        };
  
      case DELETE_TRAITEUR_SUCCESS:
        return {
          ...state,
          traiteurs: state.traiteurs.filter((traiteur) => traiteur._id !== action.payload),
        };
  
      default:
        return state;
    }
  };
  
  export default TraiteurReducer;
  