import { useState } from "react";
import jwt_decode from "jwt-decode";
import axios from 'axios';

const rootUrl = "http://localhost:8800/api/";

const loginUrl = rootUrl + "auth/login";
const userProfileUrl = rootUrl + "users/:id"

const refreshAccessJWT = rootUrl + "/refresh";
const logoutUrl = rootUrl + "user/logout";
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
            console.log("res", res.data);
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
            reject(error);
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
            Authorization: accessToken,
        },
        });

        resolve(res.data);
    } catch (error) {
      console.log(error);
      reject(error.message);
    }
  });
};