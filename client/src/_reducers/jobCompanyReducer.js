import jobsData from '../api/jobs'

const FOLLOW = 'FOLLOW';
const UNFOLLOW = 'UNFOLLOW';
const SET_JOBS = 'SET_JOBS';


const initialState = {
    jobs: [...jobsData],
};

export const jobsCompanyReducer = (state = initialState, action) => {

    switch (action.type) {
        case FOLLOW:
            return {
                ...state,
                jobs: state.jobs.map((job) => {
                    if(job.id === action.jobId) {
                        return {...job, follow: true}
                    }
                    return job;
                })
            };
        case UNFOLLOW:
            return {
                ...state,
                jobs: state.jobs.map((job) => {
                    if(job.id === action.jobId) {
                        return {...job, follow: false}
                    }
                    return job;
                })
            };
        case SET_JOBS: 
            return {
                ...state, 
                jobs: [...state.jobs, ...action.jobs]
            };
        default:
            return state;
    }
}


export const followActionCreator = (jobId) => ({ type: FOLLOW, jobId });
export const unfollowActionCreator = (jobId) => ({ type: UNFOLLOW, jobId });
export const setJobsActionCreator = (jobs) => ({ type: SET_JOBS, jobs});

export default jobsCompanyReducer;

