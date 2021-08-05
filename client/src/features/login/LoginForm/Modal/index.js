import SignIn from "../SignIn";
import styles from './styles.module.scss';
import { FaHubspot } from "react-icons/fa";


const Modal = (props) => {

    function cancelHandler(){
        props.onCancel();
    }

    function confirmHandler(){
        props.onConfirm();
    }

    return(
        <div className={styles.modal}>
            <div className={styles.login}>
            <div className={styles.signUpContainerHeader}>
                <span onClick={cancelHandler}>X</span>
            </div>
            <div className={styles.loginWrapper}>
                <div className={styles.loginLeft}
                    style={{ backgroundImage: `url(/gif/logo.gif)` }}>
                    <h3 className={styles.loginLogo}><FaHubspot /> TalentHouse</h3>
                    <span className={styles.loginDesc}>
                    Connect talented people around the world 
                    </span>
                </div>
                <SignIn onConfirm={confirmHandler}/>
                </div>
            </div>
        </div>
    )
}


export default Modal;
