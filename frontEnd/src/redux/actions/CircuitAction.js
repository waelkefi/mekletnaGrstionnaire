

import  CircuitService from '../services/circuit.service'; 

// circuitActionTypes.js

export const GET_ALL_CIRCUITS = 'GET_ALL_CIRCUITS';
export const GET_CIRCUIT_BY_ID = 'GET_CIRCUIT_BY_ID';
export const ADD_CIRCUIT = 'ADD_CIRCUIT';
export const UPDATE_CIRCUIT = 'UPDATE_CIRCUIT';
export const DELETE_CIRCUIT = 'DELETE_CIRCUIT';
export const GET_CIRCUITS_BY_DATE = 'GET_CIRCUITS_BY_DATE';
export const GET_CIRCUITS_BY_LIVREUR = 'GET_CIRCUITS_BY_LIVREUR';



// ... (importations)

export const getCircuits = () => async (dispatch) => {
    try {
        const data = await CircuitService.getAllCircuits();
        dispatch({ type: GET_ALL_CIRCUITS, payload: data });
        return { success: true, data };
    } catch (error) {
        console.error("Erreur lors de la récupération des circuits :", error);
        return { success: false, error };
    }
};

export const getCircuitById = (id) => async (dispatch) => {
    try {
        const data = await CircuitService.getCircuitById(id);
        dispatch({ type: GET_CIRCUIT_BY_ID, payload: data });
        return { success: true, data };
    } catch (error) {
        console.error("Erreur lors de la récupération du circuit par ID :", error);
        return { success: false, error };
    }
};



export const addCircuit = (data) => async (dispatch) => {
    try {
        const addedCircuit = await CircuitService.addCircuit(data);
        dispatch({ type: ADD_CIRCUIT, payload: addedCircuit });
        return { success: true, data: addedCircuit };
    } catch (error) {
        console.error("Erreur lors de l'ajout du commande :", error);
        return { success: false, error };
    }
};

export const updateCircuit = (id, data) => async (dispatch) => {
    try {
        const updatedCircuit = await CircuitService.updateCommande(id, data);
        dispatch({ type: UPDATE_CIRCUIT, payload: updatedCircuit });
        return { success: true, data: updatedCircuit };
    } catch (error) {
        console.error("Erreur lors de la mise à jour du circuit :", error);
        return { success: false, error };
    }
};

export const deleteCircuit = (id) => async (dispatch) => {
    try {
        await CircuitService.deleteCircuit(id);
        dispatch({ type: DELETE_CIRCUIT, payload: id });
        return { success: true };
    } catch (error) {
        console.error("Erreur lors de la suppression du circuit :", error);
        return { success: false, error };
    }
};

export const getCircuitsByDate = () => async (dispatch) => {
    try {
        const data = await CircuitService.getCircuitsByDate();
        dispatch({ type: GET_CIRCUITS_BY_DATE, payload: data });
        return { success: true, data };
    } catch (error) {
        console.error("Erreur lors de la récupération des circuits by date :", error);
        return { success: false, error };
    }
};

export const getCircuitsByLivreur = (id) => async (dispatch) => {
    try {
        const data = await CircuitService.getByLivreur(id);
        dispatch({ type: GET_CIRCUITS_BY_LIVREUR, payload: data });
        return { success: true, data };
    } catch (error) {
        console.error("Erreur lors de la récupération des circuits by lIVREUR :", error);
        return { success: false, error };
    }
};