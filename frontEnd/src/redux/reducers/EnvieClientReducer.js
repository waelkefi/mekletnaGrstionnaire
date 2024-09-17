// envieClient.reducer.js

import {
    GET_ALL_ENVIES,
    GET_ENVIE_BY_ID,
    ADD_ENVIE,
    UPDATE_ENVIE,
    DELETE_ENVIE
} from '../actions/EnvieClientAction';

const initialState = {
    envies: [],
    selectedEnvie: null
};

const envieClientReducer = (state = initialState, action) => {
    switch (action.type) {
        case GET_ALL_ENVIES:
            return {
                ...state,
                envies: action.payload
            };
        case GET_ENVIE_BY_ID:
            return {
                ...state,
                selectedEnvie: action.payload
            };
        case ADD_ENVIE:
            return {
                ...state,
                envies: [...state.envies, action.payload]
            };
        case UPDATE_ENVIE:
            return {
                ...state,
                envies: state.envies.map(envie =>
                    envie._id === action.payload._id ? action.payload : envie
                )
            };
        case DELETE_ENVIE:
            return {
                ...state,
                envies: state.envies.filter(envie => envie._id !== action.payload),
                selectedEnvie: null
            };
        default:
            return state;
    }
};

export default envieClientReducer;
