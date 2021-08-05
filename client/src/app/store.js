import { configureStore } from '@reduxjs/toolkit';

import { jobsCompanyReducer } from '../_reducers/jobCompanyReducer';

import postsReducer from '../features/posts/postsSlice';
import usersReducer from '../features/users/usersSlice';
import loginReducer from '../features/login/loginSlice';

//loginToHomepage: loginToHomepage,

const store = configureStore({
  reducer: {
    login: loginReducer,
    users: usersReducer,
    jobs: jobsCompanyReducer,
    posts: postsReducer,
  },
});

export default store;



