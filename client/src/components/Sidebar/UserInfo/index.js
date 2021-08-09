import { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { updateUserProfile } from '../../../features/users/userAction'

import { FaGithub, FaConnectdevelop, FaUserAstronaut, FaUserSecret } from "react-icons/fa";
import { GoLocation } from "react-icons/go";
import { HiOutlineMail } from "react-icons/hi";
import { BiNetworkChart, BiPencil } from 'react-icons/bi';
import styles from '../styles.module.scss';

const UserInfo = () => {

  const { user, updatePending, updateError } = useSelector(state => state.users);
  const dispatch = useDispatch();

  const editFields = {
    username: user.username,
    skills: user.skills,
    position: user.position,
    email:  user.email,
    city: user.city,
    followers: user.followers,
    following:user.following,
  };
  
    const [{ username, skills, position, email, city, followers, following }, setFields] = useState(
    () => editFields,
  );

  const handleChange = ( name, value ) =>
    setFields(prevFields => ({
      ...prevFields,
      [name]: value,
    }));

  const handleClick = (e) => {
    e.preventDefault();

    updateUserProfile(user._id, {username, skills, position, email, city}, dispatch);
  }

    
        return (
            <div className ={styles.sidebarList}>
                <ul>
                    <li className = {styles.sidebarListItem}>
                        <span className = {styles.sidebarListItemText}><FaGithub className = {styles.sidebarIcon}/> Name: </span>
                        <input type="text" name="username" className={styles.sidebarListItemText}
                                value={username || 'add name'}
                                onChange={(e) => handleChange(e.target.name, e.target.value)}/>
                    </li>
                    <li className = {styles.sidebarListItem}>
                      <span className = {styles.sidebarListItemText}><FaConnectdevelop className = {styles.sidebarIcon}/> Skills: </span>
                      <input type="text" name="skills" className={styles.sidebarListItemText}
                              value={skills || 'add your skills'}
                              onChange={(e) => handleChange(e.target.name, e.target.value)} />
                    </li>
                    <li className = {styles.sidebarListItem}>
                        <span className = {styles.sidebarListItemText}><BiNetworkChart className = {styles.sidebarIcon}/> Position: </span>
                        <input type="text" name="position" className={styles.sidebarListItemText}
                                value={position || 'add current position'}
                                onChange={(e) => handleChange(e.target.name, e.target.value)} />
                    </li>
                    <li className = {styles.sidebarListItem}>
                        <span className = {styles.sidebarListItemText}><HiOutlineMail className = {styles.sidebarIcon}/> Email: </span>
                        <input type="email" name="email" className={styles.sidebarListItemText}
                                    value={email || 'add email'} 
                                    onChange={(e) => handleChange(e.target.name, e.target.value)}/>
                    </li>
                    <li className = {styles.sidebarListItem}>
                        <span className = {styles.sidebarListItemText}><GoLocation className = {styles.sidebarIcon}/> City: </span>
                        <input type="text" name="city" className={styles.sidebarListItemText}
                                value={city || 'add city'}
                                onChange={(e) => handleChange(e.target.name, e.target.value)} />
                    </li>
                    <li className = {styles.sidebarListItem}>
                        <span className = {styles.sidebarListItemText}><FaUserSecret className = {styles.sidebarIcon}/> Followers: </span>
                        <span className={styles.sidebarListItemText}>{`${user.followers.length || 0}`}</span>
                    </li>
                    <li className = {styles.sidebarListItem}>
                        <span className = {styles.sidebarListItemText}><FaUserAstronaut className = {styles.sidebarIcon}/> Following: </span>
                        <span className={styles.sidebarListItemText}>{`${user.following.length || 0}`}</span>
                </li>
                </ul>
                <button className={styles.editBtn}
                        onClick={handleClick}
                        dispatch = {updatePending}>
                        Save <BiPencil />
                </button>
            {updateError &&  <span className = {styles.error}>Something went wrong! </span>}
          </div>  
                
        );
}

export default UserInfo;
