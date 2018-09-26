import React from 'react';
import { Switch, Route } from 'react-router-dom';
import Login from './Login';
import Signup from './Signup';
import Profile from './Profile';
import Logout from './Logout';

const Main = () => (
    <div>
        <Switch>
            <Route exact path = '/' component = { Login } />
            <Route path = '/login' component = { Login } />
            <Route path = '/signup' component = { Signup } />
            <Route path = '/profile' component = { Profile } />
            <Route path = '/logout' component = { Logout } />
        </Switch>
    </div>
)

export default Main;
