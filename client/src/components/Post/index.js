import React, {useState, useEffect} from "react";

import { format } from 'timeago.js';
import { Link } from 'react-router-dom';
import { FaEllipsisV } from "react-icons/fa";

import {getUserProfile} from '../../features/users/userAction'
import styles from './styles.module.scss';


const Post = ({post, account}) => {
    const [save, setLike] = useState(post.like.length);
    const [isLiked, setIsLiked] = useState(false);

    const PF = process.env.REACT_APP_PUBLIC_FOLDER;

    useEffect(() => {

        getUserProfile(post.userId)

    }, [post.userId]);

    const likeHandler = () => {
        setLike(isLiked ? save - 1 : save + 1);
        setIsLiked(!isLiked);
    }

        return (
            <div className = {styles.post}>
                <div className = {styles.postWrapper}>
                    <div className = {styles.postTop}>
                        <div className = {styles.postTopLeft}>
                            <Link to = {`/profile/${account.username}`}>
                            <img 
                                className ={styles.postProfileImg}
                                src = {account.profilePicture || PF+"person/defaultAvatar.png"} 
                                alt = "user" />
                            </Link>
                            <span className = {styles.postuserUsername}>{account.username}</span>
                        </div>
                        <div className = {styles.postTopRight}>
                        <span className = {styles.postDate}>{format(post.createdAt)}</span>
                            <FaEllipsisV />
                        </div>
                    </div>
                    <div className = {styles.postCenter}>
                        <span className = {styles.postText}>{post?.desc}</span>
                        <img 
                        className = {styles.postImg} 
                        src = {PF+post?.img}  
                        alt = "post"/>
                    </div>
                    <div className = {styles.postButton}>
                        <div className = {styles.postButtonLeft}>
                            <span className ={styles.likeIcon}
                                    onClick={likeHandler}>
                                {save === 0 ? <span>💙</span> : <span>❤️</span>} 
                            </span>
                            <span className = {styles.postlikeCounter} onClick={likeHandler}>{save} save</span>
                        </div>
                        {/*<div className={styles.postButtonRight}>
                            <span className={styles.postCommentText}>{post.comment} comments</span>
                        </div>*/}
                </div>
            </div>
        </div>
        )
    }
    

export default Post;
