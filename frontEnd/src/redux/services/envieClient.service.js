import refreshToken from "../../helpers/functions";

export const getAllEnvieClients = async () => {
    let http = await refreshToken();
    let result = await http.get(`envieClient`);
    return result.data;
}

export const getEnvieClientById = async (id) => {
    let http = await refreshToken();
    let result = await http.get(`envieClient/${id}`);
    return result.data;
}


export const addEnvieClient = async (data) => {
    let http = await refreshToken();
    let result = await http.post(`envieClient`, data);
    return result.data;
}

export const updateEnvieClient = async (id, data) => {
    let http = await refreshToken();
    let result = await http.put(`envieClient/${id}`, data);
    return result.data;
}

export const deleteEnvieClient = async (id) => {
    let http = await refreshToken();
    let result = await http.delete(`envieClient/${id}`);
    return result.data;
}


