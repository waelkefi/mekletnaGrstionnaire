import {
  GET_ALL_COMMANDES,
  GET_COMMANDE_BY_ID,
  FIND_BY_TRAITEUR,
  ADD_COMMANDE,
  UPDATE_COMMANDE,
  DELETE_COMMANDE,
  GET_COMMANDE_BY_TRAITEUR_DATE
} from '../actions/CommandeAction';

const initialState = {
  commandes: [],
  commande: null,
  commandesByTraiteur: [],
};

const commandeReducer = (state = initialState, action) => {
  switch (action.type) {
    case GET_ALL_COMMANDES:
      return {
        ...state,
        commandes: action.payload,
      };

    case GET_COMMANDE_BY_ID:
      return {
        ...state,
        commande: action.payload,
      };

    case FIND_BY_TRAITEUR:
      // Gérer l'action FIND_BY_TRAITEUR si nécessaire
      return state;

    case ADD_COMMANDE:
      return {
        ...state,
        commandes: [...state.commandes, action.payload],
      };

    case UPDATE_COMMANDE:
      return {
        ...state,
        commandes: state.commandes.map((commande) =>
          commande._id === action.payload._id ? action.payload : commande
        ),
      };

    case DELETE_COMMANDE:
      return {
        ...state,
        commandes: state.commandes.filter((commande) => commande._id !== action.payload),
      };
    case GET_COMMANDE_BY_TRAITEUR_DATE:
      return {
        ...state,
        commandesByTraiteur: action.payload,
      };
    default:
      return state;
  }
};

export default commandeReducer;
