import React from 'react';
import styles from '../styles.module.scss';
import { FaGithub, FaConnectdevelop, FaGraduationCap} from "react-icons/fa";
import { GoLocation } from "react-icons/go";


const OptionList = ({user}) => {
        return (
                <ul className ={styles.sidebarList}>
                    <li className = {styles.sidebarListItem}>
                        <FaGithub className = {styles.sidebarIcon}/>
                        <span className = {styles.sidebarListItemText}> GitHub profile:{user.email} </span>
                    </li>
                    <li className = {styles.sidebarListItem}>
                        <FaConnectdevelop className = {styles.sidebarIcon}/>
                        <span className = {styles.sidebarListItemText}> Skills:{user.skills} </span>
                    </li>
                    <li className = {styles.sidebarListItem}>
                        <FaGraduationCap className = {styles.sidebarIcon}/>
                        <span className = {styles.sidebarListItemText}> Experience year:{user.experiance} </span>
                    </li>
                    <li className = {styles.sidebarListItem}>
                        <GoLocation className = {styles.sidebarIcon}/>
                        <span className = {styles.sidebarListItemText}> City:{user.city} </span>
                    </li>
                </ul>
        );
}

export default OptionList;
