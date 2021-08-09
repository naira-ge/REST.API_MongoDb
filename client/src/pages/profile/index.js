import React, {useState, useEffect} from "react";
import { useParams } from 'react-router';
import { useSelector, useDispatch } from 'react-redux';
import axios from 'axios';

import { updateUser } from '../../api/usersApi';
import { getUserUpdateStart, getUserUpdate, getUserUpdateFail, getUserRemove } from '../../features/users/usersSlice';

import Topbar from '../../components/Topbar/index';
import Navbar from '../../components/Navbar/index';
import Sidebar from '../../components/Sidebar/index';
import Feed from '../../features/posts/Feed/index';
import Rightbar from '../../components/Rightbar/index';
import Footer from '../../components/Footer/index';
import styles from './styles.module.scss';

export default function UserProfile() {
  
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');

  const account = useSelector(state => state.users.user);
  const dispatch = useDispatch();

  const handleUpdate = (e) => {
    e.preventDefault();
    updateUser({ name, email }, dispatch);
  };

  const handleDelete = (e) => {
    e.preventDefault();
    dispatch();
  }

 
    useEffect(() => {
        
    }, [account]);
  
  
  return (
    <>
    <Navbar />
    <div className={styles.profile}>
    <Rightbar profile />
      <div className={styles.profileRight}>
        <div>
        <Topbar />
        <Feed />
        </div>
        <div>
        <Sidebar user/>
        </div>
      </div>
    </div>
    <Footer />
    </>)
  }
  