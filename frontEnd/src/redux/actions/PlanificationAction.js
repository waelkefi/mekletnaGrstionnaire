import {
    createPlanification as createPlanificationFromApi,
    getPlanifications as getPlanificationsFromApi,
    getPlanificationById as getPlanificationByIdFromApi,
    updatePlanification as updatePlanificationFromApi,
    deletePlanification as deletePlanificationFromApi,
    getPlanificationsByDate as getPlanificationsByDateFromApi,
  } from '../services/planification.service';
  
  export const CREATE_PLANIFICATION_SUCCESS = 'CREATE_PLANIFICATION_SUCCESS';
  export const FETCH_PLANIFICATION_BY_ID_SUCCESS = 'FETCH_PLANIFICATION_BY_ID_SUCCESS';
  export const UPDATE_PLANIFICATION_SUCCESS = 'UPDATE_PLANIFICATION_SUCCESS';
  export const DELETE_PLANIFICATION_SUCCESS = 'DELETE_PLANIFICATION_SUCCESS';
  export const FETCH_PLANIFICATIONS_BY_DATE_SUCCESS = 'FETCH_PLANIFICATIONS_BY_DATE_SUCCESS';
  export const GET_PLANIFICATIONS_SUCCESS = 'GET_PLANIFICATIONS_SUCCESS';
  export const createPlanification = (data) => (dispatch) => {
    return createPlanificationFromApi(data)
      .then((result) => {
        if (result) {
          dispatch({
            type: CREATE_PLANIFICATION_SUCCESS,
            payload: result,
          });
        }
        return result;
      });
  };
  
  export const getPlanifications = () => (dispatch) => {
    return getPlanificationsFromApi()
      .then((result) => {
        if (result) {
          dispatch({
            type: GET_PLANIFICATIONS_SUCCESS,
            payload: result,
          });
        }
        return result;
      });
  };

  export const fetchPlanification = (id) => (dispatch) => {
    return getPlanificationByIdFromApi(id)
      .then((result) => {
        if (result) {
          dispatch({
            type: FETCH_PLANIFICATION_BY_ID_SUCCESS,
            payload: result,
          });
        }
        return result;
      });
  };
  
  export const updatePlanification = (id, data) => (dispatch) => {
    return updatePlanificationFromApi(id, data)
      .then((result) => {
        if (result) {
          dispatch({
            type: UPDATE_PLANIFICATION_SUCCESS,
            payload: result,
          });
        }
        return result;
      });
  };
  
  export const deletePlanification = (id) => (dispatch) => {
    return deletePlanificationFromApi(id)
      .then((result) => {
        if (result) {
          dispatch({
            type: DELETE_PLANIFICATION_SUCCESS,
            payload: id,
          });
        }
        return result;
      });
  };
  

  export const fetchPlanificationsByDate = (date) => (dispatch) => {
    return getPlanificationsByDateFromApi(date)
      .then((result) => {
        if (result) {
          dispatch({
            type: FETCH_PLANIFICATIONS_BY_DATE_SUCCESS,
            payload: result,
          });
        }
        return result;
      });
  };