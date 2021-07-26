import React from 'react';
import { useSelector } from 'react-redux';
import { BrowserRouter, Switch, Route } from 'react-router-dom';
import { connect } from "react-redux";
import { PrivateRoute } from './_helpers/PrivateRoute';


//Pages
import home from './pages/home/index';
import commenthome from './pages/commenthome/index';
import login from './pages/login/index';
import userprofile from './pages/profile/index';
import pageNotFound from './pages/404/index';


const App = () => {
    //const user = useSelector(selectUser);
   
    return(
    <>
    {/* !props.loginToHomepage.login ? <TitlePage /> : */} 
    <BrowserRouter>
        <Switch>
            <Route exact path = "/login" component = {login}/>
            <PrivateRoute exact path = "/comments" component = {commenthome}/>
            <PrivateRoute exact path = "/profile/:username" component = {userprofile}/>
            <PrivateRoute exact path = "/" component = {home}/>
            <Route path="*" component = {pageNotFound} />
        </Switch>
    </BrowserRouter>
    </>
    ) 
}

const mapStateToProps = (state) =>{
    return {
        loginToHomepage: state.loginToHomepage
    }
}

export const selectLogin = (state) => state.loginToHomepage;

export default connect(mapStateToProps, null)(App);

