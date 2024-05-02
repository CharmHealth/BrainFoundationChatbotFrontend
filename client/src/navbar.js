import React from 'react';
import './navbar.css';

const NavBar = () => {
  return (
    <nav className="nav-bar">
      <ul>
        <li><a href="/">Home</a></li>
        <li><a href="/about">About</a></li>
        <li><a href="/contact">Contact</a></li>
      </ul>
    </nav>
  );
};

export default NavBar;
