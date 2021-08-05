import React, {useState} from 'react';
import { useSelector } from 'react-redux';
import { BrowserRouter, Switch, Route } from 'react-router-dom';
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
            <Route exact path = "/" component = {login}/>
            <Route exact path = "/comments" component = {commenthome}/>
            <Route exact path = "/profile/:username" component = {userprofile}/>
            <Route exact path = "/home" component = {home}/>
            <Route path="*" component = {notFound} />
        </Switch>
    </BrowserRouter>
    ) 
}


export default App;

