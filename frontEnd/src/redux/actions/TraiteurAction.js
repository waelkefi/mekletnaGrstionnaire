import {
    getAlltraiteurs as getAllTraiteursFromApi,
    gettraiteurById as getTraiteurByIdFromApi,
    addtraiteur as addTraiteurFromApi,
    updatetraiteur as updateTraiteurFromApi,
    deletetraiteur as deleteTraiteurFromApi,
  } from '../services/traiteur.service';
  
  export const FETCH_ALL_TRAITEURS_SUCCESS = 'FETCH_ALL_TRAITEURS_SUCCESS';
  export const FETCH_TRAITEUR_BY_ID_SUCCESS = 'FETCH_TRAITEUR_BY_ID_SUCCESS';
  export const ADD_TRAITEUR_SUCCESS = 'ADD_TRAITEUR_SUCCESS';
  export const UPDATE_TRAITEUR_SUCCESS = 'UPDATE_TRAITEUR_SUCCESS';
  export const DELETE_TRAITEUR_SUCCESS = 'DELETE_TRAITEUR_SUCCESS';
  
  export const fetchAllTraiteur = () => (dispatch) => {
    return getAllTraiteursFromApi()
      .then((result) => {
        if (result) {
          dispatch({
            type: FETCH_ALL_TRAITEURS_SUCCESS,
            payload: result,
          });
        }
        return result;
      });
  };
  
  export const fetchTraiteur = (id) => (dispatch) => {
    return getTraiteurByIdFromApi(id)
      .then((result) => {
        if (result) {
          dispatch({
            type: FETCH_TRAITEUR_BY_ID_SUCCESS,
            payload: result,
          });
        }
        return result;
      });
  };
  
  export const addTraiteur = (data) => (dispatch) => {
    return addTraiteurFromApi(data)
      .then((result) => {
        if (result) {
          dispatch({
            type: ADD_TRAITEUR_SUCCESS,
            payload: result,
          });
        }
        return result;
      });
  };
  
  export const updateTraiteur = (id, data) => (dispatch) => {
    return updateTraiteurFromApi(id, data)
      .then((result) => {
        if (result) {
          dispatch({
            type: UPDATE_TRAITEUR_SUCCESS,
            payload: result,
          });
        }
        return result;
      });
  };
  
  export const deleteTraiteur = (id) => (dispatch) => {
    return deleteTraiteurFromApi(id)
      .then((result) => {
        if (result) {
          dispatch({
            type: DELETE_TRAITEUR_SUCCESS,
            payload: id,
          });
        }
        return result;
      });
  };
  