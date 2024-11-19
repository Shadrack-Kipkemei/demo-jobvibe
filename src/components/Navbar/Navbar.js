import React, { useState } from 'react';
import styles from './Navbar.module.css';

const Navbar = ({ onLoginClick, onSignupClick, onJobsClick }) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  return (
    <nav className={styles.navbar}>
      <div className={styles.logo}>JobVibe</div>
      <ul className={`${styles.navlinks} ${isMenuOpen ? styles.open : ''}`}>
        <li><a href="#home">Home</a></li>
        <li><a href="#about">About</a></li>
        <li><a href="#contact">Contact</a></li>
        <li><a href="#jobs" onClick={onJobsClick}>Jobs</a></li>
        
        <li>
          <button className={styles.loginbtn} onClick={onLoginClick}>
            Login
          </button>
        </li>

        <li>
          <button className={styles.signupbtn} onClick={onSignupClick}>
            Sign Up
          </button>
        </li>
      </ul>

      {/* Mobile menu toggle */}
      <div className={styles.menutoggle} onClick={toggleMenu}>
        <span>&#9776;</span>
      </div>
    </nav>
  );
};

export default Navbar;
