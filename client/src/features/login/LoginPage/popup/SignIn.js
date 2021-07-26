import { useState } from "react";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import axios from 'axios';
import jwt_decode from "jwt-decode";

import { closeSignInPopup, openSignUpPopup, openSignInPopup, loginToHomepage } from "../actions/index.js.js";
import { FaHubspot } from "react-icons/fa";
import styles from './styles.module.scss';



const SignIn = () => {
   const [user, setUser] = useState(null);
   const [email, setEmail] = useState("");
   const [emailMsg, setEmailMsg] = useState("");
   const [password, setPassword] = useState("");
   const [passMsg, setPassMsg] = useState("");


   const handleEmailValue = (e) => {
      if (e.target.value === "") {
         setEmailMsg("Enter Email");
      } else {
         setEmail(e.target.value);
      }
   };

   const handlePasswordValue = (e) => {
      if (e.target.value === "") {
         setPassMsg("Enter password");
      } else {
         setPassword(e.target.value);
      }
   };

   //refresh token automatically
   const refreshToken = async () => {
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
   );


   const handleSignInSubmit = async (e) => {
      e.preventDefault();
      try {
         if (email !== "" && password !== "") {
            const res = await axios.post("http://localhost:8800/api/auth/login", { email, password });
            console.log("res", res.data);
            setUser(res.data);
            loginToHomepage(res.data);
            setEmail("");
            setPassword("");
         } else {
            setPassMsg("Wrong Email or Password");
            openSignInPopup();
         }

      } catch (err) {
         console.log(err);
      }
      
   };


      return (
         <div className={styles.login}>
            <div className={styles.signUpContainerHeader}>
               <span onClick={ closeSignInPopup }>X</span>
            </div>
            <div className={styles.loginWrapper}>
               <div className={styles.loginLeft}
                  style={{ backgroundImage: `url(/gif/logo.gif)` }}>
                  <h3 className={styles.loginLogo}><FaHubspot /> TalentHouse</h3>
                  <span className={styles.loginDesc}>
                     Connect talented people around the world with the on-demand creative community
                  </span>
               </div>
               <div className={styles.loginRight}>
                  <form className={styles.loginBox}
                     onSubmit={handleSignInSubmit}>
                     <input
                        type="email"
                        placeholder="Email"
                        required
                        autoComplete="off"
                        onChange={handleEmailValue}
                        value={email}
                        className={styles.loginInput}></input>
                     <p>{emailMsg}</p>
                     <input
                        type="password"
                        placeholder="Password"
                        required
                        autoComplete="new-password"
                        minLength="6"
                        onChange={handlePasswordValue}
                        value={password}
                        className={styles.loginInput}></input>
                     <p>{passMsg}</p>
                     <button className={styles.loginButton}>Sign In</button>
                  </form>
                  <div className={styles.signUpContainerFooter}>
                     <p onClick={ openSignUpPopup }>Don't have an account yet? Sign Up</p>
                  </div>
               </div>
            </div>
         </div>
      )
   };

   const mapDispatchToProps = (dispatch) => {
      return bindActionCreators(
         {
            closeSignInPopup,
            openSignUpPopup,
            openSignInPopup,
            loginToHomepage,
         },
         dispatch,
      )
   };

export default connect(null, mapDispatchToProps)(SignIn);