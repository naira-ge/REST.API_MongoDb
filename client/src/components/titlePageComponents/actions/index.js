import { OPEN_SIGN_UP_POPUP, OPEN_SIGN_IN_POPUP, ClOSE_SIGN_IN_POPUP, LOGIN_TO_HOMEPAGE, LOGIN_FAILURE, HANDLE_LOG_OUT, SIGN_UP_TO_HOMEPAGE } from "../constants/index";
import axios from 'axios';


const URL = "http://localhost:8800/api/auth/login";

export const openSignUpPopup = () => {
    return {
        type: OPEN_SIGN_UP_POPUP,
    }
}

export const openSignInPopup = () => {
    return {
        type: OPEN_SIGN_IN_POPUP,
    }
}

export const closeSignInPopup = () => {
    return {
        type: ClOSE_SIGN_IN_POPUP,
    }
}


export const loginToHomepage = ( resData ) => (dispatch) => {
        console.log("loginToHomepage", resData)
        dispatch({ type: LOGIN_TO_HOMEPAGE, payload: resData})
        console.log("login done")

    }



export const singUpToHomepage = (username, email, password) => (dispatch) => {
    console.log(username, email, password)
    const data = {
        "username": username,
        "email": email,
        "password": password
    }

    fetch(URL, {
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        },
        method: "POST",
        body: JSON.stringify(data) 
    })
    .then(res => res.json())
    .then(data => {
        console.log(data)
        dispatch({
            type: SIGN_UP_TO_HOMEPAGE,
            payload: data,
        })
    })
    .catch(err => console.log(err))
}

export const handlelogOut = () => {
    return {
        type: HANDLE_LOG_OUT, 
    }
}
