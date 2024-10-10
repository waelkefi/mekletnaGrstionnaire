// platReducer.js

import {
    GET_ALL_PLATSPRINCIPAL,
    GET_PLATPRINCIPAL_BY_ID,
    ADD_PLATPRINCIPAL,
    UPDATE_PLATPRINCIPAL,
    DELETE_PLATPRINCIPAL,
} from '../actions/PlatPrincipalAction';

const initialState = {
    platsPrincipaux: [],
    selectedPlat: null,
};

const platPrincipalReducer = (state = initialState, action) => {
    switch (action.type) {
        case GET_ALL_PLATSPRINCIPAL:
            return { ...state, platsPrincipaux: action.payload };

        case GET_PLATPRINCIPAL_BY_ID:
            return { ...state, selectedPlat: action.payload };

        case ADD_PLATPRINCIPAL:
            return { ...state, platsPrincipaux: [...state.platsPrincipaux, action.payload] };

        case UPDATE_PLATPRINCIPAL:
            return {
                ...state,
                platsPrincipaux: state.platsPrincipaux.map((plat) =>
                    plat._id === action.payload._id ? action.payload : plat
                ),
            };

        case DELETE_PLATPRINCIPAL:
            return {
                ...state,
                platsPrincipaux: state.platsPrincipaux.filter((plat) => plat._id !== action.payload),
             
            };

        default:
            return state;
    }
};

export default platPrincipalReducer;
