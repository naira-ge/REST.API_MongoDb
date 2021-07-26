import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { openSignUpPopup, openSignInPopup } from "../../actions/index.js";
import {  FaHubspot } from "react-icons/fa";
import styles from './styles.module.scss'


const Header = (props) => {
    return(
        <div className = {styles.navContainer}>
                <div className = {styles.navLeft}>
                <span className = {styles.logo}><FaHubspot className = {styles.logoImg}/> TalentHouse</span>
                </div>
                <div className = {styles.navRight}>
                <div className ={styles.navMenu}>
                    <p  onClick={ props.openSignUpPopup }>Sign Up</p>
                    <span>/</span>
                    <p onClick={ props.openSignInPopup }>Sign In</p>
                    </div>
                </div>
        </div>
    )
}

const mapDispatchToProps = (dispatch) => {
    return bindActionCreators(
     {
        openSignUpPopup,
        openSignInPopup,
     },
        dispatch,
     )    
}

export default connect(null, mapDispatchToProps)(Header);