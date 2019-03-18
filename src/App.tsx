import React, { Component } from 'react';
import logo from './logo.svg';
import {BrowserRouter as Router} from 'react-router-dom';
import Navbar from './Components/Navbar/Navbar';
import routes from './routes';

import './App.css';

class App extends Component {
  render() {
    return (
      <div className="App">
      <Navbar/>
      <Router>
        {routes}
      </Router>
      </div>
    );
  }
}

export default App;
