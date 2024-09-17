import refreshToken from "../../helpers/functions";

export const getAllCommandes = async () => {
    let http = await refreshToken();
    let result = await http.get(`commande`);
    return result.data;
}

export const getCommandeById = async (id) => {
    let http = await refreshToken();
    let result = await http.get(`commande/${id}`);
    return result.data;
}


export const addCommande = async (data) => {
    let http = await refreshToken();
    let result = await http.post(`commande`, data);
    return result.data;
}

export const updateCommande = async (id, data) => {
    let http = await refreshToken();
    let result = await http.put(`commande/${id}`, data);
    return result.data;
}

export const deleteCommande = async (id) => {
    let http = await refreshToken();
    let result = await http.delete(`commande/${id}`);
    return result.data;
}

export const getCommandeByTraiteurAndDate = async (traiteurId) => {
    let http = await refreshToken();
    let result = await http.get(`commande/getCommandeByTraiteurAndDate/${traiteurId}`);
    return result.data;
}

