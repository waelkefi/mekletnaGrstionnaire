import {
    GET_ALL_COMMANDESEVENT,
    GET_COMMANDEEVENT_BY_ID,
    ADD_COMMANDEEVENT,
    UPDATE_COMMANDEEVENT,
    DELETE_COMMANDEEVENT,
  } from '../actions/CommandeEventActions';
  
  const initialState = {
    commandesEvent: [],
    commandeEvent: null,
  };
  
  const CommandeEventRecuder = (state = initialState, action) => {
    switch (action.type) {
      case GET_ALL_COMMANDESEVENT:
        return {
          ...state,
          commandesEvent: action.payload,
        };
  
      case GET_COMMANDEEVENT_BY_ID:
        return {
          ...state,
          commandesEvent: action.payload,
        };
  
      case ADD_COMMANDEEVENT:
        return {
          ...state,
          commandesEvent: [...state.commandesEvent, action.payload],
        };
  
      case UPDATE_COMMANDEEVENT:
        return {
          ...state,
          commandesEvent: state.commandesEvent.map((commande) =>
            commande._id === action.payload._id ? action.payload : commande
          ),
        };
  
      case DELETE_COMMANDEEVENT:
        return {
          ...state,
          commandesEvent: state.commandesEvent.filter((commande) => commande._id !== action.payload),
        };
      default:
        return state;
    }
  };
  
  export default CommandeEventRecuder;
  