import React, { Component } from 'react';
import Menu from '../../components/Menu';
import logo from '../../images/logo.png';
import './home.css';
const FA = require('react-fontawesome');


class Home extends Component {
  render() {
    return (
      <div className="App">
        <Menu />
        <div className="App-header">

          <img src={logo} className="App-logo" alt="logo" />
          <h2>SURVIVORS</h2>
        </div>

        <div className="App-intro">
          <button className="button dark">
            <FA name="steam" className="btn-icon" />
            SIGN IN WITH STEAM
          </button>
        </div>

        <div className="App-intro">
          <h2>AND</h2>
        </div>

        <div className="App-intro">
          <button className="button orange">
            <FA name="user-plus" className="btn-icon" />
            START MATCHING
          </button>
        </div>
      </div>
    );
  }
}

export default Home;
