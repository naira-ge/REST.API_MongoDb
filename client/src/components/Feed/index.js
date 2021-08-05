//import { useSelector } from 'react-redux';
import React, {useState, useEffect } from 'react';
import styles from './styles.module.scss';
import Share from '../Share/index';
import Post from '../../features/posts/Post/index';
import axios from 'axios';


const Feed = ({username}) => {
    const [posts, setPosts] = useState([]);

    useEffect(() => {
        const fetchPosts = async () => {
            username 
            ? await axios.get("http://localhost:8800/api/posts/profile/" + username)
            : await axios.get("http://localhost:8800/api/posts/60f48921c410c02bac550721")
            .then(res => {
                console.log("fetchPost", res);
                setPosts(res.data);
            })
            .catch(err => {console.log(err)});
        }
        fetchPosts();
    }, [username]);

    //const posts = useSelector((state) => state.posts)

// Sort posts in reverse chronological order by datetime string
const orderedPosts = Array.isArray(posts) 
? ( posts
    .slice()
    .sort((a, b) => b.date.localeCompare(a.date))) 
: (
    [posts]
    .slice()
    .sort((a, b) => b.date.localeCompare(a.date))
    );


return (
    <div className ={styles.feed}>
        <div className ={styles.feedWrapper}>
            <Share username={username}/>
            {orderedPosts.map((post) => {
                return <Post key = {post._id} post = {post}/>
            })}
        </div>
    </div>
)
}

export default Feed;
