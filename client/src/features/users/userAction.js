import { getUserPending, getUserSuccess, getUserFail, getUserUpdateStart, getUserUpdate, getUserUpdateFail, getUserRemove } from './usersSlice';

import { getUser, updateUser } from '../../api/usersApi';


export const getUserProfile = (userId) => async (dispatch) => {
    dispatch(getUserPending());

    try {

        if (userId) {
            const result = await getUser(userId);
            console.log('userProf res.', result);

            if (result.statusText === "OK") {
                dispatch(getUserSuccess(result.data));
            }

        } else {
            dispatch(getUserFail("User is not found!"));
        }

    } catch (error) {
        dispatch(getUserFail(error.message));
    }
};

export const updateUserProfile = async (userId, editFields, dispatch) => {
    dispatch(getUserUpdateStart());

    try {

        if (userId) {    
            const result = await updateUser(userId, editFields);
            console.log('userProf res.', result);

            if (result.statusText === "OK") {
                dispatch(getUserSuccess(result.data));
            }

        } else {
            dispatch(getUserUpdateFail("User is not found!"));
        }

    } catch (error) {
        dispatch(getUserUpdateFail(error.message));
    }
}

export const setUserProfile = (user) => async (dispatch) => {
    dispatch(getUserPending());

    try {

        if (user) {
            await dispatch(getUserSuccess(user));
            
            } else {
            dispatch(getUserFail("User is not found!"));
        }

    } catch (error) {
        dispatch(getUserFail(error.message));
    }
};