import React, {useState, useEffect} from "react";
import axios from 'axios';
import { format } from 'timeago.js';
import { Link } from 'react-router-dom';
import { FaEllipsisV } from "react-icons/fa";
import styles from './styles.module.scss';



const Post = ({post}) => {
    const [like, setLike] = useState(post.like.length);
    const [isLiked, setIsLiked] = useState(false);
    const [user, setUser] = useState({});

    const PF = process.env.REACT_APP_PUBLIC_FOLDER;

    useEffect(() => {
        const fetchUser = async () => {
            await axios.get(`http://localhost:8800/api/users?userId=${post.userId}`)
            .then(res => {
                console.log("fetchUser", res.data);
                setUser(res.data);
            })
            .catch(err => {console.log(err)});
        }
        fetchUser();
    }, [post.userId]);

    const likeHandler = () => {
        setLike(isLiked ? like - 1 : like + 1);
        setIsLiked(!isLiked);
    }

        return (
            <div className = {styles.post}>
                <div className = {styles.postWrapper}>
                    <div className = {styles.postTop}>
                        <div className = {styles.postTopLeft}>
                            <Link to = {`/profile/${user.username}`}>
                            <img 
                                className ={styles.postProfileImg}
                                src = {user.profilePicture || PF+"person/defaultAvatar.png"} 
                                alt = "user" />
                            </Link>
                            <span className = {styles.postuserUsername}>{user.username}</span>
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
                                {like === 0 ? <span>💙</span> : <span>❤️</span>} 
                            </span>
                            <span className = {styles.postlikeCounter}>{like} likes</span>
                        </div>
                    <div className = {styles.postButtonRight}>
                        <span className = {styles.postCommentText}>{post.comment} comments</span>
                    </div>
                </div>
            </div>
        </div>
        )
    }
    

export default Post;
