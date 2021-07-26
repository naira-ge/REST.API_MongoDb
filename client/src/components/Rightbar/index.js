import styles from './styles.module.scss';
import HomeRightbar from './HomeRightbar/index';


const Rightbar = ({profile}) => {
    return (
        <div className ={styles.rightbar}>
            <div className ={styles.rightbarWrapper}>
                <HomeRightbar /> 
            </div>
        </div>
    )
}

export default Rightbar;
