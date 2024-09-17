
import axios from "axios";
const API = process.env.REACT_APP_API_URL


export async function refreshToken() {

    let token = await localStorage.getItem('@userGuide') 

    return axios.create({
        baseURL: API,
        headers: {
            "Content-type": "application/json",
            'Authorization': `Bearer ${token}`

        }
    });
}

export default refreshToken;