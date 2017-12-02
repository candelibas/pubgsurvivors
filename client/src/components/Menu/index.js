import React, { Component } from 'react';
import './Menu.css';
import { slide as Sidemenu } from 'react-burger-menu';
import { Link } from 'react-router-dom';
import { isSteamLoggedIn } from '../../utils/steam-api';
import ReactGA from 'react-ga';

class Menu extends Component {

  constructor(props) {
    super(props);
    this.state = {
      auth: null
    };
  }

  componentWillMount() {
    ReactGA.initialize('UA-110532802-1');
    ReactGA.pageview(window.location.pathname + window.location.search);
  }

  componentDidMount() {
    isSteamLoggedIn()
    .then((res) => {
      if(res.data.status === 'authed' ) { 
        this.setState({ auth: true });
      } else {
        this.setState({ auth: false });
      }
    });
  }

  render() {
    return (
      <Sidemenu right>
        <Link to="/" className="menu-item">Home</Link>
        {this.state.auth && <Link to="/profile" className="menu-item">My Profile</Link>}
        <Link to="/about" className="menu-item">About</Link>
      </Sidemenu>
    );
  }
};

export default Menu;