import React from 'react';
import { Switch, Route } from 'react-router-dom';
import Login from './Components/Login/Login';
import Account from './Components/Account/Account';
import TrailPage from './Components/TrailPage/TrailPage';
import Search from './Components/Search/Search';
import Home from './Components/Home/Home';

export default (
  <Switch>
    <Route path='/home' component={Home} />
    <Route path='/account' component={Account} />
    <Route path='/search' component={Search} />
    <Route exact path='/' component={Login} />
  </Switch>
);