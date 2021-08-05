import { getUserPending, getUserSuccess, getUserFail } from './usersSlice';

import { fetchUser } from '../../api/usersApi';


export const getUserProfile = (fetchData) => async (dispatch) => {
    dispatch(getUserPending());

    try {

        if (fetchData) {
            dispatch(getUserSuccess(fetchData));
        } else {
            dispatch(getUserFail("User is not found!"));
        }

        const result = await fetchUser();
        console.log('userAction result', result);

    } catch (error) {
        dispatch(getUserFail(error.message));
    }
}