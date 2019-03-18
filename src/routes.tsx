import React from "react";
import { Switch, Route } from "react-router-dom";
import Login from "./Components/Login/Login";
import Account from "./Components/Account/Account";
import TrailPage from "./Components/TrailPage/TrailPage";
import Search from "./Components/Search/Search";

export default (
  <Switch>
    <Route path="/trailpage" component={TrailPage} />
    <Route path="/account" component={Account} />
    <Route path="/trails/:id" component={TrailPage} />
    <Route path="/search" component={Search} />
    <Route exact path="/" component={Login} />
  </Switch>
);
