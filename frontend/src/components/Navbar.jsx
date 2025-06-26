import React from 'react';
import { Link } from 'react-router-dom';
import './Navbar.css';

const Navbar = () => (
  <nav className="navbar">
    <div className="navbar-title">Fitness Tracker</div>
    <div className="navbar-links">
      <Link to="/">Home</Link>
      <Link to="/stored">Stored Data</Link>
      <Link to="/login">Login</Link>
      <Link to="/signup">Sign Up</Link>
    </div>
  </nav>
);

export default Navbar;