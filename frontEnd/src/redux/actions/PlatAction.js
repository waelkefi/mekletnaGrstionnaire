

import * as PlatService from '../services/plat.service'; 

export const GET_ALL_PLATS = 'GET_ALL_PLATS';
export const GET_PLAT_BY_ID = 'GET_PLAT_BY_ID';
export const FIND_BY_TRAITEUR = 'FIND_BY_TRAITEUR';
export const ADD_PLAT = 'ADD_PLAT';
export const UPDATE_PLAT = 'UPDATE_PLAT';
export const DELETE_PLAT = 'DELETE_PLAT';


// ... (importations)

export const getAllPlats = () => async (dispatch) => {
    try {
        const data = await PlatService.getAllPlats();
        dispatch({ type: GET_ALL_PLATS, payload: data });
        return { success: true, data };
    } catch (error) {
        console.error("Erreur lors de la récupération des plats :", error);
        return { success: false, error };
    }
};

export const getPlatById = (id) => async (dispatch) => {
    try {
        const data = await PlatService.getPlatById(id);
        dispatch({ type: GET_PLAT_BY_ID, payload: data });
        return { success: true, data };
    } catch (error) {
        console.error("Erreur lors de la récupération du plat par ID :", error);
        return { success: false, error };
    }
};

export const findByTraiteur = (id) => async (dispatch) => {
    try {
        const data = await PlatService.findByTraiteur(id);
        dispatch({ type: FIND_BY_TRAITEUR, payload: data });
        return { success: true, data };
    } catch (error) {
        console.error("Erreur lors de la recherche de plats par traiteur :", error);
        return { success: false, error };
    }
};

export const addPlat = (data) => async (dispatch) => {
    try {
        const addedPlat = await PlatService.addPlat(data);
        dispatch({ type: ADD_PLAT, payload: addedPlat });
        return { success: true, data: addedPlat };
    } catch (error) {
        console.error("Erreur lors de l'ajout du plat :", error);
        return { success: false, error };
    }
};

export const updatePlat = (id, data) => async (dispatch) => {
    try {
        const updatedPlat = await PlatService.updatePlat(id, data);
        dispatch({ type: UPDATE_PLAT, payload: updatedPlat });
        return { success: true, data: updatedPlat };
    } catch (error) {
        console.error("Erreur lors de la mise à jour du plat :", error);
        return { success: false, error };
    }
};

export const deletePlat = (id) => async (dispatch) => {
    try {
        await PlatService.deletePlat(id);
        dispatch({ type: DELETE_PLAT, payload: id });
        return { success: true };
    } catch (error) {
        console.error("Erreur lors de la suppression du plat :", error);
        return { success: false, error };
    }
};
