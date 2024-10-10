import refreshToken from "../../helpers/functions";

export const getAllPlats = async () => {
    let http = await refreshToken();
    let result = await http.get(`platPrincipal`);
    return result.data;
}

export const getPlatById = async (id) => {
    let http = await refreshToken();
    let result = await http.get(`platPrincipal/${id}`);
    return result.data;
}

export const addPlat = async (data) => {
    let http = await refreshToken();
    let result = await http.post(`platPrincipal`, data, {
        headers: {
        Accept: "application/json",
        "Content-Type": "multipart/form-data",
    }});
    return result.data;
}

export const updatePlat = async (id, data) => {
    let http = await refreshToken();
    let result = await http.put(`platPrincipal/${id}`, data);
    return result.data;
}

export const deletePlat = async (id) => {
    let http = await refreshToken();
    let result = await http.delete(`platPrincipal/${id}`);
    return result.data;
}


