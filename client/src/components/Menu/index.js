import React, { Component } from 'react';
import './Menu.css';
import { slide as Sidemenu } from 'react-burger-menu';
import { Link } from 'react-router-dom';
import ReactGA from 'react-ga';

class Menu extends Component {

  constructor(props) {
    super(props);
  }

  componentDidMount() {
    // We have menu on all pages, so we can use Google Analytics in here
    ReactGA.initialize('UA-110532802-1');
    ReactGA.pageview(window.location.pathname + window.location.search);
  }

  render() {
    return (
      <Sidemenu right>
        <Link to="/" className="menu-item">Home</Link>
        {this.props.auth && <Link to="/profile" className="menu-item">My Profile</Link>}
        <Link to="/about" className="menu-item">About</Link>
      </Sidemenu>
    );
  }
};

export default Menu;