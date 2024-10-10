

import * as PlatService from '../services/platPrincipal.services'; 

export const GET_ALL_PLATSPRINCIPAL = 'GET_ALL_PLATSPRINCIPAL';
export const GET_PLATPRINCIPAL_BY_ID = 'GET_PLATPRINCIPAL_BY_ID';
export const ADD_PLATPRINCIPAL = 'ADD_PLATPRINCIPAL';
export const UPDATE_PLATPRINCIPAL = 'UPDATE_PLATPRINCIPAL';
export const DELETE_PLATPRINCIPAL = 'DELETE_PLATPRINCIPAL';


// ... (importations)

export const getAllPlatsPrincipal = () => async (dispatch) => {
    try {
        const data = await PlatService.getAllPlats();
        dispatch({ type: GET_ALL_PLATSPRINCIPAL, payload: data });
        return { success: true, data };
    } catch (error) {
        console.error("Erreur lors de la récupération des plats :", error);
        return { success: false, error };
    }
};

export const getPlatByIdPrincipal = (id) => async (dispatch) => {
    try {
        const data = await PlatService.getPlatById(id);
        dispatch({ type: GET_PLATPRINCIPAL_BY_ID, payload: data });
        return { success: true, data };
    } catch (error) {
        console.error("Erreur lors de la récupération du plat par ID :", error);
        return { success: false, error };
    }
};


export const addPlatPrincipal = (data) => async (dispatch) => {
    try {
        const addedPlat = await PlatService.addPlat(data);
        dispatch({ type: ADD_PLATPRINCIPAL, payload: addedPlat });
        return { success: true, data: addedPlat };
    } catch (error) {
        console.error("Erreur lors de l'ajout du plat :", error);
        return { success: false, error };
    }
};

export const updatePlatPrincipal = (id, data) => async (dispatch) => {
    try {
        const updatedPlat = await PlatService.updatePlat(id, data);
        dispatch({ type: UPDATE_PLATPRINCIPAL, payload: updatedPlat });
        return { success: true, data: updatedPlat };
    } catch (error) {
        console.error("Erreur lors de la mise à jour du plat :", error);
        return { success: false, error };
    }
};

export const deletePlatPrincipal = (id) => async (dispatch) => {
    try {
        await PlatService.deletePlat(id);
        dispatch({ type: DELETE_PLATPRINCIPAL, payload: id });
        return { success: true };
    } catch (error) {
        console.error("Erreur lors de la suppression du plat :", error);
        return { success: false, error };
    }
};
