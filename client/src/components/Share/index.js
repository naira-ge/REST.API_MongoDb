import React, { useState } from 'react';
import { FaRegImages, FaMapMarkerAlt, FaTags, FaRegSmileWink, FaShare} from "react-icons/fa";
import { useDispatch, useSelector } from 'react-redux';
import { postAdded } from '../../features/posts/postsSlice';
import styles from './styles.module.scss';

const Share = (props) => { 
    const [file, setFile] = useState('')
    const [userId, setUserId] = useState('')

    const PF = process.env.REACT_APP_PUBLIC_FOLDER;

    const dispatch = useDispatch()
    const users = useSelector((state) => state.user)

    const onContentChanged = (e) => setFile(e.target.value)

    const onSavePostClicked = () => {
    if (file) {
        dispatch(postAdded( file, userId))
        setFile('')
    }
}

const canSave = Boolean(file) && Boolean(userId)
    if (users) {
    const usersOptions = users.map((user) => (
    <option key={user.id} value={user.id}>
      {user.name}
    </option>
  ))
}


    return (
        <section className={styles.share}>
            <form className={styles.shareWrapper}>
                <div className={styles.shareTop}>
                    <div className = {styles.imageContainer}>
                    <img className = {styles.shareProfileImg} 
                    src = {  PF+"person/defaultAvatar.png" } alt = "user" />
                    </div>
                    <div className={styles.shareInput}>
                        <textarea
                        id="postContent"
                        name="postContent"
                        placeholder="What's on your mind?"
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
