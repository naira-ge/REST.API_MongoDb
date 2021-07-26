import { LOGIN_TO_HOMEPAGE, HANDLE_LOG_OUT, SIGN_UP_TO_HOMEPAGE } from "../constants/index.js";

const initialState = {
    id: "",
    username: "",
    email: "",
    firstName: "",
    lastName: "",
    password: "",
    age: null,
    login: false
};

export const loginToHomepage = ( state = {}, action) => {
    switch(action.type) {
        case LOGIN_TO_HOMEPAGE: 
            return {
                ...state,
                ...action.payload,
                login: true
        }
        case HANDLE_LOG_OUT:
            return {
                initialState
            }  
        case SIGN_UP_TO_HOMEPAGE:
            return {
                ...initialState,
                ...action.payload,
                login: true
            }    
        default:
            return state   
    }
}
