import React from 'react';
import './Menu.css';
import { slide as Sidemenu } from 'react-burger-menu';

const Menu = () => {
  return (
    <Sidemenu>
      <a id="home" className="menu-item" href="/">Home</a>
      <a id="about" className="menu-item" href="/profile">My Profile</a>
      <a id="contact" className="menu-item" href="/about">About</a>
    </Sidemenu>
  );
};

export default Menu;