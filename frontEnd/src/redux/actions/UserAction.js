import {
    getUser,
    login as loginFromAPI,

} from "../services/user.service";

import { jwtDecode } from "jwt-decode";

export const SIGN_IN = "SIGN_IN";
export const SING_IN_SUCCESS = "SING_IN_SUCCESS";
export const SING_IN_ERROR = "SING_IN_ERROR";
export const SIGN_OUT = "SIGN_OUT";
export const SET_INITIAL_STATE = 'SET_INITIAL_STATE';
export const setInitialState = (user) => ({
    type: SET_INITIAL_STATE,
    payload: user,
});


export const login = (values) => (dispatch) => {

    dispatch({ type: SIGN_IN });

    return loginFromAPI(values)
        .then(

            async (result) => {
                if (result) {
                    if (result.role === "ADMIN" || result.role === "GESTIONAIRE" ) {
                        // save token in local storage
                        localStorage.setItem("@userGuide", result.token)
                        let decoded = jwtDecode(result.token);
                        let user = await getUser(decoded.id)

                        result._id = decoded.id
                        dispatch({
                            type: SING_IN_SUCCESS,
                            payload: { user, token: result.token }
                        });

                        return result
                    }
                    else {
                        return false
                    }


                } else {
                    dispatch({
                        type: SING_IN_ERROR,
                        payload: "Erreur connexion",
                    });


                    return false

                }

            }

        );

};


export const fetchUser = (id) => (dispatch) => {

    return getUser(id)
        .then(

            (result) => {
                //console.log(result)
                if (result) {

                    dispatch({
                        type: SING_IN_SUCCESS,
                        payload: result,
                    });



                }
                return result
            }

        );

};



export const signOut = () => async (dispatch) => {
    try {
        await localStorage.removeItem('@userGuide');
        // await localStorage.removeItem('selectedIndex');
        dispatch({ type: SIGN_OUT });
    } catch (e) {
        console.log(e);
    }
};










