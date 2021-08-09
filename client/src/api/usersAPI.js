import { useState } from "react";
import jwt_decode from "jwt-decode";
import axios from 'axios';


const rootUrl = "http://localhost:8800/api/";

const loginUrl = rootUrl + "auth/login";
const registerUrl = rootUrl + "auth/register";
const userProfileUrl = rootUrl + "users/";
const userUpdateUrl = rootUrl + "users/";

const getUserUrl = rootUrl + "users?userId=";

const refreshAccessJWT = rootUrl + "/refresh";
const logoutUrl = rootUrl + "users/logout";
const newAccessJWT = rootUrl + "tokens";
const userVerificationUrl = userProfileUrl + "/verify";


//refresh token automatically
    /*const refreshToken = async () => {
        try {
            const res = await axios.post("/http://localhost:8800/api/auth/refresh",
                { token: user.refreshToken });
                setUser({
                ...user,
                accessToken: res.data.accessToken,
                refreshToken: res.data.refreshToken,
                })
                return res.data;
            } catch (err) {
            console.log("refresh token", err);
            }
        };

    const axiosJWT = axios.create();

    axiosJWT.interceptors.request.use(
        async (config) => {
            let currentDate = new Date();
            const decodedToken = jwt_decode(user.accessToken);
            if (decodedToken.exp * 1000 < currentDate.getTime()) {
                const data = await refreshToken();
                config.headers["authorization"] = "Bearer " + data.accessToken;
            }
            return config;
        },
        (error) => {
            return Promise.reject(error);
        }
    );*/

export const userLogin = (frmData) => {

    return new Promise(async (resolve, reject) => {

        try {
            const res = await axios.post(loginUrl, frmData);
            console.log("Login Res.", res.data);
            resolve(res);

            if (res.statusText === "OK") {
                sessionStorage.setItem("accessToken", res.data.accessToken);
                localStorage.setItem(
                    "TalentHouse",
                    JSON.stringify({ refreshToken: res.data.refreshToken })
                );
            }

        } catch (error) {
            console.log(error.message);
            reject(error.message);
        }
    });
};

export const fetchUser = () => {
    return new Promise(async (resolve, reject) => {
    try {
        const accessToken = sessionStorage.getItem("accessToken");

        if (!accessToken) {
        reject("Token not found!");
        }

        const res = await axios.get(userProfileUrl, {
        headers: {
            authorization: "Bearer " + accessToken,
        },
        });

        console.log('fetchUser', res)
        resolve(res.data);
    } catch (error) {
      console.log(error);
      reject(error.message);
    }
  });
};

export const getUser = async (userId) => {
    return new Promise(async (resolve, reject) => {

        try {
            const res = await axios.get(getUserUrl + userId);
            console.log("Get user Res.", res.data);
            resolve(res);
        
        } catch (error) {
            reject(error.message);
        }
    });
};

export const updateUser = async (userId, editFields) => {
    return new Promise(async (resolve, reject) => {

        try {
            const res = await axios.patch(userUpdateUrl + userId,
                { userId, ...editFields }
            );
            console.log("Update Res.", res.data);
            resolve(res);
        
        } catch (error) {
            reject(error.message);
        }
    });
};


export const registerUser = (frmData) => {

    return new Promise(async (resolve, reject) => {

        try {
            const res = await axios.post(registerUrl, frmData);
            console.log("Register User.", res.data);
            resolve(res);

            if (res.statusText === "OK") {
                sessionStorage.setItem("accessToken", res.data.accessToken);
                localStorage.setItem(
                    "TalentHouse",
                    JSON.stringify({ refreshToken: res.data.refreshToken })
                );
            }

        } catch (error) {
            console.log(error.message);
            reject(error.message);
        }
    });
};
