import styles from './styles.module.scss'
import { FaHubspot } from "react-icons/fa"
import { NavLink } from "react-router-dom";

const AccountLogin = () =>{
    return(
    <div className={styles.loginBox}>
        <input type="email" 
        className={styles.loginInput}
        placeholder = "Email" />
        <input type="password" 
        className={styles.loginInput}
        placeholder = "Password" />
        <button className={styles.loginButton}>Log In</button>
        <div className={styles.loginButtonContainer}>
        <p className={styles.loginForgot}>Forgot Password ?</p>
        <NavLink require to="/signup">
        <button className={styles.loginRegisterButton}>Create a New Account</button>
        </NavLink>
        </div>
    </div>
    )
}

const CreateAccount = () => {
    return(
        <div className={styles.loginBox}>
        <input type="text" 
        className={styles.loginInput}
        placeholder = "User Name" />
        <input type="email" 
        className={styles.loginInput}
        placeholder = "Email" />
        <input type="password" 
        className={styles.loginInput}
        placeholder = "Password" />
        <input type="password" 
        className={styles.loginInput}
        placeholder = "Re-enter password" />
        <button className={styles.loginButton}>Sign Up</button>
        <div className={styles.loginButtonContainer}>
        <NavLink require to="/login">
        <button className={styles.loginRegisterButton}>Log into Account</button>
        </NavLink>
        </div>
    </div>
    )
}

const Login = ({profile}) => {
    return (
        <div className={styles.login}>
            <div className={styles.loginWrapper}>
                <div className={styles.loginLeft} 
                style={{backgroundImage: `url(/gif/preview.gif)`}}>
                    <h3 className={styles.loginLogo}><FaHubspot /> TalentHouse</h3>
                    <span className={styles.loginDesc}>
                    Connect talented people around the world with the largest on-demand creative community
                    </span>
                </div>
                <div className={styles.loginRight}>
                
                    {profile ? <AccountLogin /> : <CreateAccount />}  
                
                </div>
            </div>
        </div>
    )
}

export default Login
