import React, { Component } from 'react';
import Menu from '../../components/Menu';
import logo from '../../images/logo.png';
import './edit-profile.css';
const FA = require('react-fontawesome');

class EditProfile extends Component {
  render() {
    return (
      <div className="App">
        <Menu />
        <div className="App-header">

          <img src={logo} className="App-logo" alt="logo" />
          <h2>PROFILE</h2>
        </div>

      </div>
    );
  }
}

export default EditProfile;
