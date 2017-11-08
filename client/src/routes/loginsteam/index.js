import React, { Component } from 'react';

class LoginSteam extends Component {

  componentDidMount() {
    
  }

  loginWithSteam() {
    fetch('auth/steam/return', {mode: 'cors'}).then((req) => {
      window.location = req.url;
      console.log(req);
    });
  }
}

export default LoginSteam;
