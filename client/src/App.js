import React from 'react';
import { useSelector } from 'react-redux';
import { BrowserRouter, Switch, Route } from 'react-router-dom';
import { connect } from "react-redux";
import { PrivateRoute } from './components/PrivateRoute/index';


//Pages
import home from './pages/home/index';
import commenthome from './pages/commenthome/index';
import login from './pages/login/LogIn/index';
import userprofile from './pages/profile/index';
import notFound from './pages/404/index';


const App = () => {
    //const user = useSelector(selectUser);
   
    return(
    <BrowserRouter>
        <Switch>
            <Route exact path = "/login" component = {login}/>
            <PrivateRoute exact path = "/comments" component = {commenthome}/>
            <PrivateRoute exact path = "/profile/:username" component = {userprofile}/>
            <Route exact path = "/" component = {home}/>
            <Route path="*" component = {notFound} />
        </Switch>
    </BrowserRouter>
    ) 
}

const mapStateToProps = (state) =>{
    return {
        loginToHomepage: state.loginToHomepage
    }
}

export const selectLogin = (state) => state.loginToHomepage;

export default connect(mapStateToProps, null)(App);

