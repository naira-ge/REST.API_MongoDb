import { OPEN_SIGN_UP_POPUP, OPEN_SIGN_IN_POPUP, ClOSE_SIGN_IN_POPUP } from "../constants/index.js";

const initialState = {
    openPopup: false,
    signUpPopup: false,
    signInPopup: false,
}

export const popupHandler = (state = initialState, action) => {
    switch(action.type) {
        case OPEN_SIGN_UP_POPUP:
            return {
                ...state,
                openPopup: true,
                signUpPopup: true,
                signInPopup: false,
            }
        case OPEN_SIGN_IN_POPUP:
            return {
                ...state,
                openPopup: true,
                signUpPopup: false,
                signInPopup: true,
            } 
        case ClOSE_SIGN_IN_POPUP:
            return {
                ...state,
                openPopup: false,
                signUpPopup: false,
                signInPopup: false,
            }       
        default: 
            return state
    }
}