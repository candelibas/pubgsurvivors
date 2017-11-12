import React, { Component } from 'react';
import Menu from '../../components/Menu';
import logo from '../../images/logo.png';
import './home.css';
const FA = require('react-fontawesome');
const axios = require('axios');
const Spinner = require('react-spinkit');

class Home extends Component {

  constructor(props) {
    super(props);
    
    this.state = { 
      loading: true,
      auth: null, 
      steamid: null, 
      username: null, 
      profile: null, 
      avatar: null 
    };
  }

  componentWillMount() {
    document.body.className = 'home';
    // This binding is necessary to make `this` work in the callback
    this.loginWithSteam = this.loginWithSteam.bind(this);

    // Check Steam authentication
    axios.get('/authcheck')
    .then((response) => {

      if(response.data.status === 'authed')
      {
        this.setState({
          loading: false,
          auth: response.data.status,
          steamid: response.data.user.steamid, 
          username: response.data.user.username,
          profile: response.data.user.profile,
          avatar: response.data.user.avatar
        });
      }

      if(response.data.status === 'not_authed') {
        this.setState({
          loading: false
        });
      }
      
    })
    .catch(function (error) {
      console.log(error);
    });

  }

  loginWithSteam = () => {
    window.location = "http://localhost:5000/auth";
  }

  render() {
    
    const { loading, username } = this.state;  
    const user_check = this.state.username ? 
    <h3>Welcome, {this.state.username} </h3>
    : 
    <div className="App-intro">
    <button className="button dark" onClick={this.loginWithSteam}>
      <FA name="steam" className="btn-icon" />
      SIGN IN WITH STEAM
    </button>
    <h2>AND</h2>
    </div>
    
    return (
      <div className="App">
        <Menu />
        <div className="App-header">

          <img src={logo} className="App-logo" alt="logo" />
          <h2>SURVIVORS</h2>
          
        </div>

        <div className="App-intro">

          {loading &&
            <div style={{textAlign: 'center', marginLeft: 820 + 'px'}}><Spinner name="pacman" /></div>
          }

          {!loading &&
            user_check
          }

        </div>


        <div className="App-intro">
          <button className="button orange">
          {/* <button className="button orange btn-disabled"> */}
            <FA name="user-plus" className="btn-icon" />
            START MATCHING
          </button>
        </div>
      </div>
    );
  }
}

export default Home;
