import { combineReducers } from "redux";
import { loginToHomepage } from '../components/titlePageComponents/reducer/login';
import { popupHandler } from '../components/titlePageComponents/LoginPage/TitlePage';
import { jobsCompanyReducer } from './jobCompanyReducer';
import { postsReducer } from './postsReducer';

const rootReducer = combineReducers({
    popupHandler: popupHandler,
    loginToHomepage: loginToHomepage,
    posts: postsReducer,
    jobsPage: jobsCompanyReducer,
})

export default rootReducer;