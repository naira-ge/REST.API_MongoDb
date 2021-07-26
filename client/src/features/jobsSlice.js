import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';


export const jobsSlice = createSlice({
  name: 'jobs',
  initialState: { 
    jobs: [
      {id: 5, follow: false, company: "name", logo:"https://thumbs.dreamstime.com/b/business-company-logo-27438246.jpg", location:"USA", title:"JavaScript", description:"Great Front-End Work", url:"url", company_url:"company url", created_at:"data", how_to_apply:"how to apply"},
      {id: 2, follow: true, company: "name", logo:"https://www.logodesign.net/logo/abstract-cuboid-building-4519ld.png", location:"USA", title:"JavaScript", description:"Great Front-End Work", url:"url", company_url:"company url", created_at:"data", how_to_apply:"how to apply"}
  ],
  },
  // The `reducers` field lets us define reducers and generate associated actions
  reducers: {
    follow: (state, action) => {
      // Redux Toolkit allows us to write "mutating" logic in reducers. It
      // doesn't actually mutate the state because it uses the Immer library,
      // which detects changes to a "draft state" and produces a brand new
      // immutable state based off those changes
    return state.jobs.map((job) => {
        if(job.id === action.jobId) {
            return {...job, follow: true}
        }
        return job;
    })
    },
    unfollow: (state, action) => {
      return state.jobs.map((job) => {
        if(job.id === action.jobId) {
            return {...job, follow: false}
        }
        return job;
    })
    },
    setjobs: (state, action) => {
      return [...state.jobs, ...action.jobs]
    },
  },
  
});

export const { follow, unfollow, setjobs } = jobsSlice.actions;

// The function below is called a selector and allows us to select a value from
// the state. Selectors can also be defined inline where they're used instead of
// in the slice file. For example: `useSelector((state: RootState) => state.counter.value)`
export const selectJobs = (state) => state.jobs.jobs;


export default jobsSlice.reducer;
