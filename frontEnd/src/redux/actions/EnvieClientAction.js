// envieClient.actions.js

import * as EnvieClientService from "../services/envieClient.service";

export const GET_ALL_ENVIES = 'GET_ALL_ENVIES';
export const GET_ENVIE_BY_ID = 'GET_ENVIE_BY_ID';
export const ADD_ENVIE = 'ADD_ENVIE';
export const UPDATE_ENVIE = 'UPDATE_ENVIE';
export const DELETE_ENVIE = 'DELETE_ENVIE';

export const getEnvies = () => async (dispatch) => {
    try {
        const data = await EnvieClientService.getAllEnvieClients();
        dispatch({ type: GET_ALL_ENVIES, payload: data });
        return { success: true, data };
    } catch (error) {
        console.error("Erreur lors de la récupération des envies des clients :", error);
        return { success: false, error };
    }
};

export const getEnvieById = (id) => async (dispatch) => {
    try {
        const data = await EnvieClientService.getEnvieClientById(id);
        dispatch({ type: GET_ENVIE_BY_ID, payload: data });
        return { success: true, data };
    } catch (error) {
        console.error("Erreur lors de la récupération de l'envie client par ID :", error);
        return { success: false, error };
    }
};

export const addEnvie = (data) => async (dispatch) => {
    try {
        const addedEnvie = await EnvieClientService.addEnvieClient(data);
        dispatch({ type: ADD_ENVIE, payload: addedEnvie });
        return { success: true, data: addedEnvie };
    } catch (error) {
        console.error("Erreur lors de l'ajout de l'envie du client :", error);
        return { success: false, error };
    }
};

export const updateEnvie = (id, data) => async (dispatch) => {
    try {
        const updatedEnvie = await EnvieClientService.updateEnvieClient(id, data);
        dispatch({ type: UPDATE_ENVIE, payload: updatedEnvie });
        return { success: true, data: updatedEnvie };
    } catch (error) {
        console.error("Erreur lors de la mise à jour de l'envie du client :", error);
        return { success: false, error };
    }
};

export const deleteEnvie = (id) => async (dispatch) => {
    try {
        await EnvieClientService.deleteEnvieClient(id);
        dispatch({ type: DELETE_ENVIE, payload: id });
        return { success: true };
    } catch (error) {
        console.error("Erreur lors de la suppression de l'envie du client :", error);
        return { success: false, error };
    }
};
