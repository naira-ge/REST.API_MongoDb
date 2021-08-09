import styles from '../styles.module.scss';
import { FaHotjar,  } from "react-icons/fa";
import {connect} from "react-redux";
import { GoCheck } from "react-icons/go";
import {followActionCreator, unfollowActionCreator, setJobsActionCreator} from '../../../_reducers/jobCompanyReducer';

const HomeRightbar = (props) => {
    
    const PF = process.env.REACT_APP_PUBLIC_FOLDER;

    return(
        <div className ={styles.jobsContainer}>
            <img className={styles.jobImg} src={PF + "/job/logo.job.png"} alt="jobs" />
                    <span className ={styles.jobsText}>
                    <FaHotjar /> <b>{props.jobs.length} </b> new positions for you
                    </span>
                    <div className = {styles.jobsWrapper}>
                <ul>
                    {props.jobs.map((job, index) => {
                    return (
                    <li key = {index}
                    className = {styles.companyDetails}>
                        <div className = {styles.companyLogoContainer}>
                        <img className = {styles.companyLogo} src ={job.logo} alt = "user"/>
                        </div>
                        <div className = {styles.companyDesc}>
                        <h4 className = {styles.position}>{job.company_name} LLC</h4>
                        </div>
                        <div className = {styles.follow}>
                        {job.follow 
                        ? (<span onClick = {() => (props.unfollow(job.id))}><GoCheck /> Follow </span>)
                        : (<span onClick = {() => (props.follow(job.id))}> Unfollow </span>) }
                        </div>
                    </li>)})}
                </ul>
            </div>
               {/* <button className = {styles.rightbarButton}>Show more</button> */}
        </div>
    )
}

const mapStateToProps = (state) => {
    return {
        jobs: state.jobs.jobs,
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        follow: (jobId) => {
            dispatch(followActionCreator(jobId))
        },
        unfollow: (jobId) => {
            dispatch(unfollowActionCreator(jobId))
        },
        setJob: (jobs) => {
            dispatch(setJobsActionCreator(jobs))
        }
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(HomeRightbar);