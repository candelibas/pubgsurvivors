import React, { Component } from 'react';
import Menu from '../../components/Menu';
import logo from '../../images/logo.png';
import './about.css';
const FA = require('react-fontawesome');

class About extends Component {
  render() {
    return (
      <div className="App">
        <Menu />
        <div className="App-header">

          <img src={logo} className="App-logo" alt="logo" />
          <h2>About</h2>
        </div>

        <div className="App-intro">
          <p>This project aims to solve finding your best soul-mate(s) on PUBG</p>
        </div>

      </div>
    );
  }
}

export default About;
