import React from "react";
import Navbar from '../components/Navbar/index'
import Footer from '../components/Footer/index'
import styles from './styles.module.scss'

export const DefaultLayout = ({ children }) => {
    return (
        <>
        <header>
            <Navbar />
        </header>
        <div className={styles.homeContainer}>
            <main>{children}</main>
        </div>
        <footer>
            <Footer />
        </footer>
    </>
  );
};