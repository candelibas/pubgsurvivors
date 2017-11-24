import React, { Component } from 'react';
import Menu from '../../components/Menu';
import logo from '../../images/logo.png';
import './about.css';
const FA = require('react-fontawesome');

class Matching extends Component {

  componentDidMount() {
    document.title = 'PUBG Survivors - Matching'; 
    document.body.className = 'matching';
  }

  render() {
    return (
      <div className="App">
        <Menu />
        <div className="App-header">

          <img src={logo} className="App-logo" alt="logo" />
          <h2>Matching</h2>
        </div>

        <div className="App-intro">
          <p>Finding your best friend <3...</p>
        </div>

      </div>
    );
  }
}

export default Matching;
