import styles from "./styles.module.scss";
import OptionList from './OptionList/index';
import ExploreUsers from './ExploreUsers/index';
import OnlineUsers from './OnlineUsers/index';
import FollowUser from './FollowUser/index';


const Sidebar = ({ user }) => {
    return (
        <div className ={styles.sidebar}>
            <div className ={styles.sidebarWrapper}>
            {user ? 
            <>
            <OptionList user  = {user}/>
            <FollowUser profile/>
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