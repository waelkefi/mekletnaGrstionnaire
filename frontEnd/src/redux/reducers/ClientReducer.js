// reducers/clientReducer.js

import {
    FETCH_ALL_CLIENTS_SUCCESS,
    FETCH_CLIENT_BY_ID_SUCCESS,
    ADD_CLIENT_SUCCESS,
    UPDATE_CLIENT_SUCCESS,
    DELETE_CLIENT_SUCCESS,
  } from '../actions/ClientAction';
  
  const initialState = {
    clients: [],
    selectedClient: null,
  };
  
  const ClientReducer = (state = initialState, action) => {
    switch (action.type) {
      case FETCH_ALL_CLIENTS_SUCCESS:
        return {
          ...state,
          clients: action.payload,
        };
  
      case FETCH_CLIENT_BY_ID_SUCCESS:
        return {
          ...state,
          selectedClient: action.payload,
        };
  
      case ADD_CLIENT_SUCCESS:
        return {
          ...state,
          clients: [...state.clients, action.payload],
        };
  
      case UPDATE_CLIENT_SUCCESS:
        return {
          ...state,
          clients: state.clients.map((client) =>
            client._id === action.payload._id ? action.payload : client
          ),
        };
  
      case DELETE_CLIENT_SUCCESS:
        return {
          ...state,
          clients: state.clients.filter((client) => client._id !== action.payload),
        };
  
      default:
        return state;
    }
  };
  
  export default ClientReducer;
  