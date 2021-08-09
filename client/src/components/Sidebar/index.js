import styles from "./styles.module.scss";
import Userinfo from './UserInfo/index';
import ExploreUsers from './ExploreUsers/index';
import OnlineUsers from './OnlineUsers/index';
import FollowUser from './FollowUser/index';

/*<FollowUser profile/>*/

const Sidebar = ({ user }) => {
    return (
        <div className ={styles.sidebar}>
            <div className ={styles.sidebarWrapper}>
            {user ? 
            <>
            <Userinfo user={user} />
                        
            </> : 
            <>
            <ExploreUsers />
            <OnlineUsers/>
            </>
            }
            </div>
        </div>
    )
}

export default Sidebar;