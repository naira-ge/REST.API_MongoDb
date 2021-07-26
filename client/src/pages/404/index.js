import Navbar from '../../components/Navbar/index'
import Sidebar from '../../components/Sidebar/index'
import Feed from '../../components/Feed/index'
import Rightbar from '../../components/Rightbar/index'
import Footer from '../../components/Footer/index'
import styles from './styles.module.scss'


export default function PageNotFound() {
  return (
    <>
    <Navbar />
    <div className={styles.errorContainer}>
      <h1>404 Page not found</h1>
    </div>
    <Footer />
    </>
  );
}


