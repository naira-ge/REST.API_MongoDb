import { useSelector } from 'react-redux';
import ImageUpload from './ImageUpload';
import styles from './styles.module.scss';


const Topbar = () => {

    const user = useSelector(state => state.users.user)
    const PF = process.env.REACT_APP_PUBLIC_FOLDER;
    
    return (
    <div className={styles.profileRightTop}>
        <div className={styles.profileCover}>
            <img className={styles.profileCoverImg} 
            src ={user.coverPicture || PF+"person/defaultCover.jpg"} alt ="cover"/>
        <div className={styles.profileUserImgContainer}>
            <img className={styles.profileUserImg} 
            src = {user.profilePicture || PF+"person/defaultAvatar.png" } alt = "profile"/>
        </div>
            <ImageUpload/>
      </div>
      <div className={styles.profileInfo}>
            <h4 className={styles.profileInfoName}>{ user.username }</h4>
            <span className={styles.profileInfoDesc}>{ user.desc }</span>
      </div>
    </div>
    )
}

export default Topbar;