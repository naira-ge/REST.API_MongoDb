import axios from 'axios';

import { getPostsPending, getPostsSuccess, getPostsFail, createPostPending,  createPostSuccess, createPostFail } from '../features/posts/postsSlice';

const rootUrl = "http://localhost:8800/api/";


const userPostsUrl = rootUrl + "posts/timeline/";
const createPostsUrl = rootUrl + "posts/";


export const fetchUserPosts = async ( userId, dispatch) => {

    return new Promise(async (resolve, reject) => {
        dispatch(getPostsPending());

        try {
            const res = await axios.get(userPostsUrl + userId);
            console.log("Posts Res.", res.data);
            resolve(res);

            if (res.statusText === "OK") {
                dispatch(getPostsSuccess(res.data));
            }

        } catch (error) {
            reject(error.message);
            dispatch(getPostsFail(error.message));
        }
    });
};

export const createUserPost = async ( userId, desc, dispatch) => {

    return new Promise(async (resolve, reject) => {
        dispatch(createPostPending());

        try {
            const res = await axios.post(userPostsUrl, {userId, desc});
            console.log("Posts Res.", res.data);
            resolve(res);

            if (res.statusText === "OK") {
                dispatch(createPostSuccess(res.data));
            }

        } catch (error) {
            reject(error.message);
            dispatch(createPostFail(error.message));
        }
    });
};


