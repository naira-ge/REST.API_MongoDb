import { configureStore } from '@reduxjs/toolkit';

import { loginToHomepage } from '../components/titlePageComponents/reducer/login';
import { popupHandler } from '../components/titlePageComponents/reducer/popupHandler';
import { jobsCompanyReducer } from '../_reducers/jobCompanyReducer';
import { usersReducer } from '../_reducers/userReducer';

import postsReducer from '../features/posts/postsSlice';
import userReducer from '../features/users/usersSlice';
import loginReducer from '../features/login/loginSlice';


 const store = configureStore({
  reducer: {
    popupHandler: popupHandler,
    loginToHomepage: loginToHomepage,
    login:loginReducer,
    jobs: jobsCompanyReducer,
    users: usersReducer,
    user: userReducer,
    posts: postsReducer,
  },
});

export default store;



