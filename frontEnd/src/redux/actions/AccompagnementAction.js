

import * as PlatService from '../services/accompagnement.services'; 

export const GET_ALL_PLATSGARNITURE= 'GET_ALL_PLATSGARNITURE';
export const GET_PLATSGARNITURE_BY_ID = 'GET_PLATSGARNITURE_BY_ID';
export const ADD_PLATSGARNITURE = 'ADD_PLATSGARNITURE';
export const UPDATE_PLATSGARNITURE = 'UPDATE_PLATSGARNITURE';
export const DELETE_PLATSGARNITURE = 'DELETE_PLATSGARNITURE';


// ... (importations)

export const getAllPlatsAccompagnement = () => async (dispatch) => {
    try {
        const data = await PlatService.getAllPlats();
        dispatch({ type: GET_ALL_PLATSGARNITURE, payload: data });
        return { success: true, data };
    } catch (error) {
        console.error("Erreur lors de la récupération des plats :", error);
        return { success: false, error };
    }
};

export const getPlatByIdAccompagnement = (id) => async (dispatch) => {
    try {
        const data = await PlatService.getPlatById(id);
        dispatch({ type: GET_PLATSGARNITURE_BY_ID, payload: data });
        return { success: true, data };
    } catch (error) {
        console.error("Erreur lors de la récupération du plat par ID :", error);
        return { success: false, error };
    }
};


export const addPlatAccompagnement = (data) => async (dispatch) => {
    try {
        const addedPlat = await PlatService.addPlat(data);
        dispatch({ type: ADD_PLATSGARNITURE, payload: addedPlat });
        return { success: true, data: addedPlat };
    } catch (error) {
        console.error("Erreur lors de l'ajout du plat :", error);
        return { success: false, error };
    }
};

export const updatePlatAccompagnement = (id, data) => async (dispatch) => {
    try {
        const updatedPlat = await PlatService.updatePlat(id, data);
        dispatch({ type: UPDATE_PLATSGARNITURE, payload: updatedPlat });
        return { success: true, data: updatedPlat };
    } catch (error) {
        console.error("Erreur lors de la mise à jour du plat :", error);
        return { success: false, error };
    }
};

export const deletePlatAccompagnement = (id) => async (dispatch) => {
    try {
        await PlatService.deletePlat(id);
        dispatch({ type: DELETE_PLATSGARNITURE, payload: id });
        return { success: true };
    } catch (error) {
        console.error("Erreur lors de la suppression du plat :", error);
        return { success: false, error };
    }
};
