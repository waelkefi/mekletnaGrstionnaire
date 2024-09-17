import refreshToken from "../../helpers/functions";

export const getAlltraiteurs = async () => {
    let http = await refreshToken();
    let result = await http.get(`traiteur`);
    return result.data;
}

export const gettraiteurById = async (id) => {
    let http = await refreshToken();
    let result = await http.get(`traiteur/${id}`);
    return result.data;
}

export const addtraiteur = async (data) => {
    let http = await refreshToken();
    let result = await http.post(`traiteur`, data);
    return result.data;
}

export const updatetraiteur = async (id, data) => {
    let http = await refreshToken();
    let result = await http.put(`traiteur/${id}`, data);
    return result.data;
}

export const deletetraiteur = async (id) => {
    let http = await refreshToken();
    let result = await http.delete(`traiteur/${id}`);
    return result.data;
}


