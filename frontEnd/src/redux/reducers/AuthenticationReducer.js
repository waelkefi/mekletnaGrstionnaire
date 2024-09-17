
import {
    SIGN_IN,
    SING_IN_SUCCESS,
    SING_IN_ERROR,
    SIGN_OUT,
    SET_INITIAL_STATE

} from '../actions/UserAction';


let initialState = {
    isLoading: false,
    isSignOut: false,
    userToken:  null,
    user: {},
    error: null,
}

const AuthenticationReducer = (state = initialState, action) => {

    switch (action.type) {

        case SET_INITIAL_STATE:
            return {
                ...state,
                user: action.payload,
            };

        case SIGN_IN:
            return {
                ...state,
                isLoading: true,
            };
        case SING_IN_SUCCESS:
            return {
                ...state,
                isLoading: false,
                userToken: action.payload.token,
                user: action.payload.user
            };
        case SING_IN_ERROR:
            return {
                ...state,
                isLoading: false,
                error: action,
            };
        case SIGN_OUT:
            return {
                ...state,
                isSignOut: true,
                userToken: null,
                user: {},
                error: null,
            };



        case "RESTORE_TOKEN":

            return {
                ...state,
                isLoading: false,
                userToken: action.token,
                user: action.user,
            };

        default:
            return state

    }
}

export default AuthenticationReducer;
