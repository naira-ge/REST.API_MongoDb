import styles from './styles.module.scss';
import SignUp from "./SingUp.js";
import { connect } from "react-redux";
import SignIn from "./SignIn.js";


const Popup = ( props ) => {
    return(
        <div className={styles.popup}>
            { props.popupHandler.signUpPopup ? <SignUp /> : null}
            { props.popupHandler.signInPopup ? <SignIn /> : null}
        </div>
    )
}

const mapStateToProps = (state) => {
    return {
        popupHandler: state.popupHandler,
    }
  }

export default connect(mapStateToProps, null)(Popup);
