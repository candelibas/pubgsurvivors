import React, { Component } from 'react';
import logo from '../../images/logo.png';
import './home.css';
const FA = require('react-fontawesome');

class Home extends Component {

  render() {
    return (
      <div className="App">
        <div className="App-header">
        
          <img src={logo} className="App-logo" alt="logo" />
          <h2>SURVIVORS</h2>
        </div>

        <p className="App-intro">
          <button className="button dark">
            <FA name='steam' stack='5x' className="btn-icon" />
            Sign in with Steam
          </button>
        </p>

        <p className="App-intro">
          <h2>AND</h2>
        </p>

        <p className="App-intro">
          <button className="button orange">
            <FA name='user-plus' stack='5x' className="btn-icon" />
            Start Matching
          </button>
        </p>
      </div>
    );
  }
}

export default Home;
