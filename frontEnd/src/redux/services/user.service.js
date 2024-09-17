import axios from "axios";
import refreshToken from "../../helpers/functions";
// import refreshToken from "../helpers/functions";
const API = process.env.REACT_APP_API_URL

export const login = async (values) => {
    return await  axios
        .post(`${API}user/login`, values)
        .then((response) => { return response.data })
        .catch((err) => console.log(err));
}

export const getUser = async (id) => {
    return await axios
        .get(`${API}user/${id}`)
        .then((response) => { return response.data })
        .catch((err) => console.log(err));
}

export const addUser = async (data) => {
    let http = await refreshToken()
    let result = await http.post(`user/`,data)
    return result.data
}

export const getLivreur = async () => {
    let http = await refreshToken()
    let result = await http.get('user/livreur')
    return result.data;
}

export const deleteUSer = async (id) => {
    let http = await refreshToken()
    let result = await http.delete(`user/${id}`)
    return result.data;
}
export const updateUSer = async (id, data) => {
    let http = await refreshToken()
    let result = await http.put(`user/${id}`,data)
    return result.data;
}