import { getUserPending, getUserSuccess, getUserFail } from './usersSlice';

export const getUserProfile = () => (dispatch) => {
    try {
        dispatch(getUserPending());

    } catch (error) {
        dispatch(getUserFail(error.message));
    }
}