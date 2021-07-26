import styles from './styles.module.scss';

const Content = () => {
    return(
        <div className={styles.contentWrapper}>
                <img  className = {styles.contentImage} src = "/assets/connected.png" alt="team"/>
                <div className = {styles.contentText}>
                    <h3 >Connects talented people around the world with the largest on-demand creative community</h3>
                    <p>
                        Search for developers, individual contributors, developer startups & expansion growth companies.
                    </p>
                    <p>
                        Build your sales, marketing, product, and customer success teams all in one place
                    </p>
                </div>
        </div>
    )
}

export default Content;