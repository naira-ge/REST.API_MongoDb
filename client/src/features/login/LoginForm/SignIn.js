import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory, useLocation } from "react-router-dom";

import { loginPending, loginSuccess, loginFail } from "../loginSlice";
import { userLogin } from '../../../api/usersAPI';
import { getUserProfile } from '../../users/userAction'
import styles from './styles.module.scss';



const SignIn = (props) => {
   const dispatch = useDispatch();
   const history = useHistory();
   let location = useLocation();

   const { isLoading, isAuth, error } = useSelector(state => state.login);
   let { from } = location.state || { from: { pathname: "/" } };


   /*useEffect(() => {
      sessionStorage.getItem("accessJWT") && history.replace(from);
   }, [history, isAuth]);*/

   const [email, setEmail] = useState("");
   const [emailMsg, setEmailMsg] = useState("");
   const [password, setPassword] = useState("");
   const [passMsg, setPassMsg] = useState("");

   const handleOnChange = (e) => {
      const { name, value } = e.target;

      switch (name) {
         case "email":
            setEmail(value);
            break;

         case "password":
            setPassword(value);
            break;

         default:
            break;
      }
   };

   const handleSignInSubmit = async (e) => {
      e.preventDefault();
         
         if (!email || !password) { 
            setPassMsg("Fill up all the form!");
         };

         dispatch(loginPending());

         try {
            const isAuth = await userLogin({ email, password });

            if (isAuth.statusText !== "OK") {
            setPassMsg("Invalid email or password!");
				return dispatch(loginFail(isAuth.message));
			}

            dispatch(loginSuccess());
            dispatch(getUserProfile());
            setEmail("");
            setPassword("");
            props.onConfirm();
            history.push('/');

         } catch (error) {
            setPassMsg("Invalid email or password!");
            dispatch(loginFail(error.message));
         }
      
      };


      return (
         <div className={styles.loginRight}>
            <form className={styles.loginBox}
               onSubmit={handleSignInSubmit}>
               <input
                  type="email"
                  name="email"
                  placeholder="Email"
                  required
                  autoComplete="off"
                  onChange={handleOnChange}
                  value={email}
                  className={styles.loginInput}></input>
               <p>{emailMsg}</p>
               <input
                  type="password"
                  name="password"
                  placeholder="Password"
                  required
                  autoComplete="new-password"
                  minLength="6"
                  onChange={handleOnChange}
                  value={password}
                  className={styles.loginInput}></input>
               <p>{passMsg}</p>
               <button className={styles.loginButton}>Sign In</button>
            </form>
            <div className={styles.signUpContainerFooter}>
               <p onClick={props.onConfirm}>Don't have an account yet? Sign Up</p>
            </div>
         </div>
      )
   };

export default SignIn;
