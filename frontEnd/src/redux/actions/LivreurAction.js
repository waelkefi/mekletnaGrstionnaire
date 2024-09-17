import {
    addUser, deleteUSer, getLivreur, updateUSer,
  } from "../services/user.service";
  
  export const FETCH_LIVREURS = "FETCH_LIVREURS";
  export const ADD_LIVREUR = "ADD_LIVREUR";
  export const DELETE_LIVREUR = "DELETE_LIVREUR";
  export const UPDATE_LIVREUR = "UPDATE_LIVREUR";
  
  export const fetchAllLivreur = () => (dispatch) => {
    return getLivreur().then((result) => {
      if (result) {
        dispatch({
          type: FETCH_LIVREURS,
          payload: result,
        });
      }
      return result;
    });
  };
  
  export const addLivreur = (data) => (dispatch) => {
    return addUser(data).then((result) => {
      if (result) {
        dispatch({
          type: ADD_LIVREUR,
          payload: result,
        });
      }
      return result;
    });
  };
  
  export const udpateLivreur = (userId, updatedData) => (dispatch) => {
    return updateUSer(userId, updatedData).then((result) => {
      if (result) {
        dispatch({
          type: UPDATE_LIVREUR,
          payload: {
            _id: userId,
            updatedData,
          },
        });
      }
      return result;
    });
  };
  
  export const deleteLivreur = (_id) => (dispatch) => {
    return deleteUSer(_id).then((result) => {
      if (result) {
        dispatch({
          type: DELETE_LIVREUR,
          payload:  _id ,
        });
      }
      return result;
    });
  };
  