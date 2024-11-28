import refreshToken from "../../helpers/functions";

export const getAllPlats = async () => {
    let http = await refreshToken();
    let result = await http.get(`plat`);
    return result.data;
}

export const getPlatById = async (id) => {
    let http = await refreshToken();
    let result = await http.get(`plat/${id}`);
    return result.data;
}
export const findByTraiteur = async (id) => {
    let http = await refreshToken()
    let result = await http.get(`plat/findByTrait/${id}`)
    return result.data
}

export const addPlat = async (data) => {
    let http = await refreshToken();
    let result = await http.post(`plat`, data, {
        headers: {
        Accept: "application/json",
        "Content-Type": "multipart/form-data",
    }});
    return result.data;
}

export const updatePlat = async (id, data) => {
    let http = await refreshToken();
    let result = await http.put(`plat/${id}`, data);
    return result.data;
}
export const updatePlatwithimage = async (id, data) => {
    let http = await refreshToken();
    let result = await http.put(`plat/updatewithimage/${id}`, data, {
        headers: {
        Accept: "application/json",
        "Content-Type": "multipart/form-data",
    }});
    return result.data;
}
export const deletePlat = async (id) => {
    let http = await refreshToken();
    let result = await http.delete(`plat/${id}`);
    return result.data;
}


