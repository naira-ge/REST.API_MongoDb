import React, {useState, useEffect} from "react";
import { useParams } from 'react-router';

import axios from 'axios';
import Topbar from '../../components/Topbar/index';
import Navbar from '../../components/Navbar/index';
import Sidebar from '../../components/Sidebar/index';
import Feed from '../../components/Feed/index';
import Rightbar from '../../components/Rightbar/index';
import Footer from '../../components/Footer/index';
import styles from './styles.module.scss';

export default function UserProfile() {
  const [user, setUser] = useState({});
  const username = useParams().username;

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
    }, [username]);


  return (
    <>
    <Navbar />
    <div className={styles.profile}>
    <Rightbar profile />
      <div className={styles.profileRight}>
        <div>
        <Topbar user = {user}/>
        <Feed username ={username}/>
        </div>
        <div>
        <Sidebar user = {user}/>
        </div>
      </div>
    </div>
    <Footer />
    </>)
  }
  