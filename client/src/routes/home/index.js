import React, { Component } from 'react';
import Menu from '../../components/Menu';
import logo from '../../images/logo.png';
import './home.css';
import { Link } from 'react-router-dom';
import { isSteamLoggedIn } from '../../utils/steam-api';
import FA from 'react-fontawesome';
import Spinner from 'react-spinkit';

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

  componentDidMount() {
    document.title = 'PUBG Survivors - Home';
    document.body.className = 'home';
    // This binding is necessary to make `this` work in the callback
    this.loginWithSteam = this.loginWithSteam.bind(this);

    // Check Steam authentication
    isSteamLoggedIn()
      .then((response) => {

        // Set state for authenticated user
        if (response.data.status === 'authed') {
          this.setState({
            loading: false,
            auth: response.data.status,
            steamid: response.data.user.steamid,
            username: response.data.user.username,
            profile: response.data.user.profile,
            avatar: response.data.user.avatar
          });
        }
        // Set loader indicator state for not authenticated user
        if (response.data.status === 'not_authed') {
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
    window.location = "http://pubgsurvivors.com/auth";
  }

  render() {
    const { loading, username, auth } = this.state;
    const user_check = username ?
      <h3>Welcome, {username} </h3>
      : // Otherwise,
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
            <div style={{ display: 'flex', justifyContent: 'center', marginBottom: '10px' }}><Spinner name="pacman" /></div>
          }

          {!loading &&
            user_check
          }

        </div>


        <div className="App-intro">
          {auth === 'authed' &&
            <Link to="/about">
              <button className="button orange">
                <FA name="user-plus" className="btn-icon" />
                START MATCHING
            </button>
            </Link>
          }

          {!auth &&
            <button className="button orange btn-disabled" disabled>
              <FA name="user-plus" className="btn-icon" />
              START MATCHING
            </button>
          }
        </div>
      </div>
    );
  }
}

export default Home;
