import DefaultLayout from '../../components/DefaultLayout/index';
import styles from './styles.module.scss';


export default function PageNotFound() {
  return (
    <DefaultLayout>
      <div className={styles.errorContainer}>
          <h1 className = {styles.content}>404 Page not found</h1>
      </div>
    </DefaultLayout>
  );
}


