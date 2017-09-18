import React from 'react';
import './Menu.css';
import { slide as Sidemenu } from 'react-burger-menu';
import { Link } from 'react-router-dom';

const Menu = () => {
  return (
    <Sidemenu right>
      <Link to="/" className="menu-item">Home</Link>
      <Link to="/profile" className="menu-item">My Profile</Link>
      <Link to="/about" className="menu-item">About</Link>
    </Sidemenu>
  );
};

export default Menu;