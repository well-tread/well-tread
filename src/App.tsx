import React, { Component } from 'react';
import Navbar from './Components/Navbar/Navbar';
import routes from './routes';
import { withRouter,RouteComponentProps } from 'react-router';
import './App.css';

// Type whatever you expect in 'this.props.match.params.*'
type PathParamsType = {
  param1: string,
}

// Your component own properties
type PropsType = RouteComponentProps<PathParamsType> & {
  // someString: string,
}

class App extends React.Component<PropsType> {
  render() {
    return (
      <div className="App">
      {this.props.history.location.pathname === '/' ? null : <Navbar/>}
      {routes}
      </div>
    );
  }
}

export default withRouter(App);