// platReducer.js

import {
    GET_ALL_PLATSGARNITURE,
    GET_PLATSGARNITURE_BY_ID,
    ADD_PLATSGARNITURE,
    UPDATE_PLATSGARNITURE,
    DELETE_PLATSGARNITURE,
} from '../actions/AccompagnementAction';

const initialState = {
    platsAccompagnement: [],
    selectedPlat: null,
};

const platAccompagnementReducer = (state = initialState, action) => {
    switch (action.type) {
        case GET_ALL_PLATSGARNITURE:
            return { ...state, platsAccompagnement: action.payload };

        case GET_PLATSGARNITURE_BY_ID:
            return { ...state, selectedPlat: action.payload };

        case ADD_PLATSGARNITURE:
            return { ...state, platsAccompagnement: [...state.platsAccompagnement, action.payload] };

        case UPDATE_PLATSGARNITURE:
            return {
                ...state,
                platsAccompagnement: state.platsAccompagnement.map((plat) =>
                    plat._id === action.payload._id ? action.payload : plat
                ),
            };

        case DELETE_PLATSGARNITURE:
            return {
                ...state,
                platsAccompagnement: state.platsAccompagnement.filter((plat) => plat._id !== action.payload),
            };

        default:
            return state;
    }
};

export default platAccompagnementReducer;
