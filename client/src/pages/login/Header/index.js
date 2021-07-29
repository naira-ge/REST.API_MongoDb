import { useState } from 'react';
import { FaHubspot } from "react-icons/fa";
import styles from './styles.module.scss';
import Modal from '../../../features/login/LoginForm/Modal/index';
import Backdrop from '../../../features/login/LoginForm/Modal/Backdrop';


const Header = () => {
    const [modalIsOpen, setModalIsOpen] = useState(false);

    function openModalhandler(){
        setModalIsOpen(true);
    }

    function closeModaleHandler(){
        setModalIsOpen(false);
    }
    
    return(
        <div className = {styles.navContainer}>
                <div className = {styles.navLeft}>
                <span className = {styles.logo}><FaHubspot className = {styles.logoImg}/> TalentHouse</span>
                </div>
                <div className = {styles.navRight}>
                <div className ={styles.navMenu}>
                    <p  onClick={openModalhandler}>Sign Up</p>
                    <span>/</span>
                    <p onClick={openModalhandler}>Sign In</p>
                    </div>
                </div>
                {modalIsOpen && (<Modal 
                onCancel = {closeModaleHandler}
                onConfirm = {closeModaleHandler}
                />) }
                {modalIsOpen && <Backdrop onClick = {closeModaleHandler}/>}
        </div>
    )
}


export default Header;