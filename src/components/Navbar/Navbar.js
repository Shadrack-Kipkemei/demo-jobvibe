import React, { useState } from 'react';
import "./Navbar.module.css"

const Navbar = ({ onLoginClick, onSignupClick, onJobsClick }) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  return (
    <nav className="navbar">
      <div className="logo">JobVibe</div>
      <ul className={`nav-links ${isMenuOpen ? 'open' : ''}`}>
        <li><a href="#home">Home</a></li> 
        <li><a href="#about">About</a></li> 
        <li><a href="#contact">Contact</a></li> 
        <li><a href="#jobs" onClick={onJobsClick}>Jobs</a></li>  {/* Add Jobs button */}
        
        
        {/* Button to toggle Login Form */}
        <li>
          <button className="login-btn" onClick={onLoginClick}>
            Login
          </button>
        </li>

        {/* Button to toggle Sign Up Form */}
        <li>
          <button className="signup-btn" onClick={onSignupClick}>
            Sign Up
          </button>
        </li>
      </ul>

      {/* Mobile menu toggle */}
      <div className="menu-toggle" onClick={toggleMenu}>
        <span>&#9776;</span>
      </div>
    </nav>
  );
};

export default Navbar;
