import React, { useState } from 'react';
import { FaRegImages, FaMapMarkerAlt, FaTags, FaRegSmileWink, FaShare} from "react-icons/fa";
import { useDispatch, useSelector } from 'react-redux';

import { createUserPost } from '../../api/postsApi';
import styles from './styles.module.scss';

const Share = () => {
    const account = useSelector(state => state.users.user);
    const dispatch = useDispatch();

    const [file, setFile] = useState('');
    const userId = account._id;

    const PF = process.env.REACT_APP_PUBLIC_FOLDER;

    const onContentChanged = (e) => setFile(e.target.value)

    const onSavePostClicked = (e) => {
        e.preventDefault();

        if (file) {
            createUserPost(userId, file, dispatch)
            setFile('')
    }
}

const canSave = Boolean(file) && Boolean(userId)
    if (account) {
    /*const usersOptions = account.map((user) => (
    <option key={user.id} value={user.id}>
      {user.name}
    </option>
  ))*/
}

    return (
        <section className={styles.share}>
            <form className={styles.shareWrapper}>
                <div className={styles.shareTop}>
                    <div className = {styles.imageContainer}>
                    <img className = {styles.shareProfileImg} 
                    src = {account.profilePicture ||  PF+"person/defaultAvatar.png" } alt = "user" />
                    </div>
                    <div className={styles.shareInput}>
                        <textarea
                        id="postContent"
                        name="postContent"
                        placeholder={`What's on your mind ${account.username || ""}?`}
                        value={file}
                        onChange={onContentChanged}/>
                    </div>
                </div>
                <hr className={styles.shareHr} />
                <div className={styles.shareBottom}>
                    <div className={styles.shareOptions}>
                        <div className ={styles.shareOption}>
                            <FaRegImages className={styles.shareIcon}/>
                            <span className = {styles.shareOptionText}>Photo or Video</span>
                        </div>
                        <div className ={styles.shareOption}>
                            <FaTags className={styles.shareIcon}/>
                            <span className = {styles.shareOptionText}>Tag</span>
                        </div>
                        <div className ={styles.shareOption}>
                            <FaMapMarkerAlt className={styles.shareIcon}/>
                            <span className = {styles.shareOptionText}>Location</span>
                        </div>
                        <div className ={styles.shareOption}>
                            <FaRegSmileWink className={styles.shareIcon}/>
                            <span className = {styles.shareOptionText}>Emojis</span>
                        </div>
                    </div>
                    <button 
                    className = {styles.shareButton}
                    onClick={onSavePostClicked} disabled={!canSave}>
                    <FaShare />
                    </button>
                </div>
            </form>
        </section>
    )
}



export default Share;
