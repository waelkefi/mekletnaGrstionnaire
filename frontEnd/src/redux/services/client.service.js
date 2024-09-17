import refreshToken from "../../helpers/functions";

export const getAllClients = async () => {
    let http = await refreshToken();
    let result = await http.get(`client`);
    return result.data;
}

export const getClientById = async (id) => {
    let http = await refreshToken();
    let result = await http.get(`client/${id}`);
    return result.data;
}

export const addClient = async (data) => {
    let http = await refreshToken();
    let result = await http.post(`client`, data);
    return result.data;
}

export const updateClient = async (id, data) => {
    let http = await refreshToken();
    let result = await http.put(`client/${id}`, data);
    return result.data;
}

export const deleteClient = async (id) => {
    let http = await refreshToken();
    let result = await http.delete(`client/${id}`);
    return result.data;
}


