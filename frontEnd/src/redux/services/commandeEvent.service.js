import refreshToken from "../../helpers/functions";

export const getAllCommandes = async () => {
    let http = await refreshToken();
    let result = await http.get(`commandeEvent`);
    return result.data;
}

export const getCommandeById = async (id) => {
    let http = await refreshToken();
    let result = await http.get(`commandeEvent/${id}`);
    return result.data;
}


export const addCommande = async (data) => {
    let http = await refreshToken();
    let result = await http.post(`commandeEvent`, data);
    return result.data;
}

export const updateCommande = async (id, data) => {
    let http = await refreshToken();
    let result = await http.put(`commandeEvent/${id}`, data);
    return result.data;
}

export const deleteCommande = async (id) => {
    let http = await refreshToken();
    let result = await http.delete(`commandeEvent/${id}`);
    return result.data;
}



