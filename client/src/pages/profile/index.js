import React, {useState, useEffect} from "react";
import { useParams } from 'react-router';
import { useSelector, useDispatch } from 'react-redux';
import axios from 'axios';

import { updateUser } from '../../api/usersApi';
import { getUserUpdateStart, getUserUpdate, getUserUpdateFail, getUserRemove } from '../../features/users/usersSlice';

import Topbar from '../../components/Topbar/index';
import Navbar from '../../components/Navbar/index';
import Sidebar from '../../components/Sidebar/index';
import Feed from '../../components/Feed/index';
import Rightbar from '../../components/Rightbar/index';
import Footer from '../../components/Footer/index';
import styles from './styles.module.scss';

export default function UserProfile() {
  
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');

  const username = useParams().username;

  const user = useSelector(state => state.users.user);
  const dispatch = useDispatch();

  const handleUpdate = (e) => {
    e.preventDefault();
    updateUser({ name, email }, dispatch());
  };

  const handleDelete = (e) => {
    e.preventDefault();
    dispatch();
  }

  /*
    useEffect(() => {
        const fetchUser = async () => {
            await axios.get(`http://localhost:8800/api/users?username=${username}`)
            .then(res => {
                console.log("fetchUser", res.data);
                setUser(res.data);
            })
            .catch(err => {console.log(err)});
        }
        fetchUser();
    }, [username]);*/
  
/*<div>
        <Sidebar />
        </div>*/
  
  return (
    <>
    <Navbar />
    <div className={styles.profile}>
    <Rightbar profile />
      <div className={styles.profileRight}>
        <div>
        <Topbar user = {user}/>
        <Feed username ={user.username}/>
        </div>
        
      </div>
    </div>
    <Footer />
    </>)
  }
  