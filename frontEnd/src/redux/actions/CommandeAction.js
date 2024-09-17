

import * as CommandeService from '../services/commande.servise'; 

export const GET_ALL_COMMANDES = 'GET_ALL_COMMANDES';
export const GET_COMMANDE_BY_ID = 'GET_COMMANDE_BY_ID';
export const FIND_BY_TRAITEUR = 'FIND_BY_TRAITEUR';
export const ADD_COMMANDE = 'ADD_COMMANDE';
export const UPDATE_COMMANDE = 'UPDATE_COMMANDE';
export const DELETE_COMMANDE = 'DELETE_COMMANDE';
export const GET_COMMANDE_BY_TRAITEUR_DATE = 'GET_COMMANDE_BY_TRAITEUR_DATE';



// ... (importations)

export const getCommandes = () => async (dispatch) => {
    try {
        const data = await CommandeService.getAllCommandes();
        dispatch({ type: GET_ALL_COMMANDES, payload: data });
        return { success: true, data };
    } catch (error) {
        console.error("Erreur lors de la récupération des commandes :", error);
        return { success: false, error };
    }
};

export const getCommandeById = (id) => async (dispatch) => {
    try {
        const data = await CommandeService.getCommandeById(id);
        dispatch({ type: GET_COMMANDE_BY_ID, payload: data });
        return { success: true, data };
    } catch (error) {
        console.error("Erreur lors de la récupération du commande par ID :", error);
        return { success: false, error };
    }
};



export const addCommande = (data) => async (dispatch) => {
    try {
        const addedCommande = await CommandeService.addCommande(data);
        dispatch({ type: ADD_COMMANDE, payload: addedCommande });
        return { success: true, data: addedCommande };
    } catch (error) {
        console.error("Erreur lors de l'ajout du commande :", error);
        return { success: false, error };
    }
};

export const updateCommande = (id, data) => async (dispatch) => {
    try {
        const updatedCommande = await CommandeService.updateCommande(id, data);
        dispatch({ type: UPDATE_COMMANDE, payload: updatedCommande });
        return { success: true, data: updatedCommande };
    } catch (error) {
        console.error("Erreur lors de la mise à jour du commande :", error);
        return { success: false, error };
    }
};

export const deleteCommande = (id) => async (dispatch) => {
    try {
        await CommandeService.deleteCommande(id);
        dispatch({ type: DELETE_COMMANDE, payload: id });
        return { success: true };
    } catch (error) {
        console.error("Erreur lors de la suppression du commande :", error);
        return { success: false, error };
    }
};

export const getCommandeByTraiteurAndDate = (traiteurId) => async (dispatch) => {
    try {
        const data = await CommandeService.getCommandeByTraiteurAndDate(traiteurId);
        dispatch({ type: GET_COMMANDE_BY_TRAITEUR_DATE, payload: data });
        return { success: true, data };
    } catch (error) {
        console.error("Erreur lors de la récupération des commandes par traiteur et date :", error);
        return { success: false, error };
    }
};