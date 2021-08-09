import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';

import Share from '../../../components/Share/index';
import Post from '../../../components/Post/index';
import Loader from '../../../components/Loader/index';

import { fetchUserPosts } from '../../../api/postsApi';
    
import styles from './styles.module.scss';


const Feed = () => {
    const account = useSelector(state => state.users.user);
    const postsPending = useSelector(state => state.posts.isLoading);
    const posts = useSelector(state => state.posts.userPosts);

    const dispatch = useDispatch();

    let accountId = account._id;

    useEffect(() => {
        fetchUserPosts(accountId , dispatch);
    }, [account]);
    

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
            <Share />
            {postsPending ?
                <Loader /> :
                (posts && orderedPosts.map((post) => {
                return <Post key={post._id} post={post} account={account}/>
                }))
            }
        </div>
    </div>
)
}

export default Feed;
