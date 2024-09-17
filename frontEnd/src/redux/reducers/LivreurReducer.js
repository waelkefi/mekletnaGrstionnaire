// livreurReducer.js

import {
    FETCH_LIVREURS,
    ADD_LIVREUR,
    UPDATE_LIVREUR,
    DELETE_LIVREUR,
  } from '../actions/LivreurAction';
  
  const initialState = {
    livreurs: [],
  };
  
  const livreurReducer = (state = initialState, action) => {
    switch (action.type) {
      case FETCH_LIVREURS:
        return {
          ...state,
          livreurs: action.payload,
        };
  
      case ADD_LIVREUR:
        return {
          ...state,
          livreurs: [...state.livreurs, action.payload],
        };
  
      case UPDATE_LIVREUR:
        const updatedLivreurs = state.livreurs.map((livreur) =>
          livreur._id === action.payload._id ? { ...livreur, ...action.payload.updatedData } : livreur
        );
  
        return {
          ...state,
          livreurs: updatedLivreurs,
        };
  
      case DELETE_LIVREUR:
        const filteredLivreurs = state.livreurs.filter((livreur) => livreur._id !== action.payload);
  
        return {
          ...state,
          livreurs: filteredLivreurs,
        };
  
      default:
        return state;
    }
  };
  
  export default livreurReducer;