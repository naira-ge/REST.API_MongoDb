import Navbar from '../../components/Navbar/index'
import Sidebar from '../../components/Sidebar/index'
import Feed from '../../features/posts/Feed/index'
import Rightbar from '../../components/Rightbar/index'
import Footer from '../../components/Footer/index'
import styles from './styles.module.scss'

export default function CommentHome() {
  return (
    <>
    <Navbar />
    <div className={styles.homeContainer}>
    <Rightbar />
    <Feed />
    <Sidebar />
    </div>
    <Footer />
    </>
  );
}


