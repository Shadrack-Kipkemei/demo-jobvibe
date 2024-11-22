import React, { useState } from 'react';
import styles from './Navbar.module.css';
import {Link} from "react-router-dom";

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  return (
    <nav className={styles.navbar}>
      <div className={styles.logo}>JobVibe</div>
      <ul className={`${styles.navlinks} ${isMenuOpen ? styles.open : ''}`}>
        <li><Link to="/">Home</Link></li>
        <li><Link to="/about">About</Link></li>
        <li><Link to="/contact">Contact</Link></li>
        <li><Link to="/jobs">Jobs</Link></li>
        
        <li>
          <Link to="/login">
          <button className={styles.loginbtn}>Login</button>
          </Link>
        </li>

        <li>
        <Link to="/signup">
          <button className={styles.signupbtn}>Sign Up</button>
          </Link>
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
