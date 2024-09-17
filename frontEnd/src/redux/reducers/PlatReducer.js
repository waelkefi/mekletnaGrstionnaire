// platReducer.js

import {
    GET_ALL_PLATS,
    GET_PLAT_BY_ID,
    FIND_BY_TRAITEUR,
    ADD_PLAT,
    UPDATE_PLAT,
    DELETE_PLAT,
} from '../actions/PlatAction';

const initialState = {
    plats: [],
    selectedPlat: null,
};

const platReducer = (state = initialState, action) => {
    switch (action.type) {
        case GET_ALL_PLATS:
            return { ...state, plats: action.payload };

        case GET_PLAT_BY_ID:
            return { ...state, selectedPlat: action.payload };

        case FIND_BY_TRAITEUR:
            return { ...state, plats: action.payload };

        case ADD_PLAT:
            return { ...state, plats: [...state.plats, action.payload] };

        case UPDATE_PLAT:
            return {
                ...state,
                plats: state.plats.map((plat) =>
                    plat._id === action.payload._id ? action.payload : plat
                ),
            };

        case DELETE_PLAT:
            return {
                ...state,
                plats: state.plats.filter((plat) => plat._id !== action.payload),
            };

        default:
            return state;
    }
};

export default platReducer;
