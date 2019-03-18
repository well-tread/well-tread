import React from 'react';
import {Switch, Route} from 'react-router-dom';
import Login from './Components/Login/Login';
import Account from './Components/Account/Account';

export default(
    <Switch>
        <Route path='/account' component={Account} />
        <Route exact path='/' component={Login} />
    </Switch>
)