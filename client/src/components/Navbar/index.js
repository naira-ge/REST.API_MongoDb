import { Link } from 'react-router-dom';
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { handlelogOut } from "../titlePageComponents/actions/index.js";
import { FaSearch,  FaHubspot } from "react-icons/fa";
import { GoBriefcase, GoTerminal } from "react-icons/go";
import styles from './styles.module.scss';

const Navbar = ( props ) => {

    const PF = process.env.REACT_APP_PUBLIC_FOLDER;

        return (
            <div className = {styles.navContainer}>
                <div className = {styles.navLeft}>
                <Link to="/">
                    <span className = {styles.logo}><FaHubspot className = {styles.logoImg}/> TalentHouse</span>
                </Link>
                </div>
                <div className = {styles.navCenter}>
                    <div className = {styles.searchbar}>
                        <FaSearch className = {styles.searchIcon}/>
                        <input placeholder = "Search" type = {styles.searchInput}></input>
                    </div>
                    <Link to="/">
                        <div className={styles.navIconItem}>
                            <GoBriefcase className = {styles.logoJob}/>
                        </div>
                    </Link>
                    <Link to="/comments">
                        <div className={styles.navIconItem}>
                            <GoTerminal className = {styles.logoJob}/>
                        </div>
                    </Link>
                </div>
                <div className = {styles.navRight}>
                    <div className ={styles.navMenu}>
                        <div className ={styles.userInfo}>
                            <span className={styles.profileInfoName}>{ props.loginToHomepage.username }</span>
                            <Link to="/profile/:username">
                                <div className={styles.navImgContainer}>
                                    <img src = { PF+"person/defaultAvatar.png" } alt = "user" className={styles.navImg} />
                                </div>
                            </Link>
                        </div>
                        <div onClick={ props.handlelogOut }>Log Out</div>
                    </div>
                </div>
                {/* <div className = {styles.navIcons}>
                        <div className={styles.navIconItem}>
                            <FaBriefcase />
                            <span className= {styles.navIconBadge}>1</span>
                        </div>
                        <div className={styles.navIconItem}>
                            <FaRegUser />
                            <span className= {styles.navIconBadge}>1</span>
                        </div>
                        <div className={styles.navIconItem}>
                            <FaFacebookMessenger />
                            <span className= {styles.navIconBadge}>2</span>
                        </div>
                        <div className={styles.navIconItem}>
                            <FaRegBell />
                            <span className= {styles.navIconBadge}>3</span>
                        </div>
                </div>*/}
            </div>
        )
}

const mapStateToProps = (state) => {
    return{
        loginToHomepage: state.loginToHomepage,
    }
} 

const mapDispatchToProps = (dispatch) => {
    return bindActionCreators(
        {
            handlelogOut   
        },
        dispatch
    )
}
export default connect(mapStateToProps, mapDispatchToProps)(Navbar);
