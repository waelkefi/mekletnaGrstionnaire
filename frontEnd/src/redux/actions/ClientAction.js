import {
    getAllClients as getAllClientsFromApi,
    getClientById as getClientByIdFromApi,
    addClient as addClientFromApi,
    updateClient as updateClientFromApi,
    deleteClient as deleteClientFromApi,
  } from '../services/client.service';
  
  export const FETCH_ALL_CLIENTS_SUCCESS = 'FETCH_ALL_CLIENTS_SUCCESS';
  export const FETCH_CLIENT_BY_ID_SUCCESS = 'FETCH_CLIENT_BY_ID_SUCCESS';
  export const ADD_CLIENT_SUCCESS = 'ADD_CLIENT_SUCCESS';
  export const UPDATE_CLIENT_SUCCESS = 'UPDATE_CLIENT_SUCCESS';
  export const DELETE_CLIENT_SUCCESS = 'DELETE_CLIENT_SUCCESS';
  
  export const fetchAllClient = () => (dispatch) => {
    return getAllClientsFromApi()
      .then((result) => {
        if (result) {
          dispatch({
            type: FETCH_ALL_CLIENTS_SUCCESS,
            payload: result,
          });
        }
        return result;
      });
  };
  
  export const fetchClient = (id) => (dispatch) => {
    return getClientByIdFromApi(id)
      .then((result) => {
        if (result) {
          dispatch({
            type: FETCH_CLIENT_BY_ID_SUCCESS,
            payload: result,
          });
        }
        return result;
      });
  };
  
  export const addClient = (data) => (dispatch) => {
    return addClientFromApi(data)
      .then((result) => {
        if (result) {
          dispatch({
            type: ADD_CLIENT_SUCCESS,
            payload: result,
          });
        }
        return result;
      });
  };
  
  export const updateClient = (id, data) => (dispatch) => {
    return updateClientFromApi(id, data)
      .then((result) => {
        if (result) {
          dispatch({
            type: UPDATE_CLIENT_SUCCESS,
            payload: result,
          });
        }
        return result;
      });
  };
  
  export const deleteClient = (id) => (dispatch) => {
    return deleteClientFromApi(id)
      .then((result) => {
        if (result) {
          dispatch({
            type: DELETE_CLIENT_SUCCESS,
            payload: id,
          });
        }
        return result;
      });
  };
  