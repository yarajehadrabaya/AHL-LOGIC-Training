/* components/Navbar.jsx */

import React from 'react';
import { Link } from 'react-router-dom';
import './Navbar.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHome, faUser, faSignOutAlt, faInfoCircle } from '@fortawesome/free-solid-svg-icons'; // استيراد الأيقونات

const Navbar = () => {
  return (
    <nav className="sidebar">
      <div className="logo">
        {/* إضافة عنصر Link حول شعار اللوجو */}
        <Link to="/">
          <img src="./img/logo.png" alt="Logo" className="logo-img" />
        </Link>
      </div>
      <ul>
        <li>
          <Link to="/">
            <FontAwesomeIcon icon={faHome} className="icon" />
            <span>Home</span>
          </Link>
        </li>
        <li>
          <Link to="/profile">
            <FontAwesomeIcon icon={faUser} className="icon" />
            <span>Profile</span>
          </Link>
        </li>
        <li>
          <Link to="/login">
            <FontAwesomeIcon icon={faSignOutAlt} className="icon" />
            <span>Logout</span>
          </Link>
        </li>
        <li>
          <Link to="/about">
            <FontAwesomeIcon icon={faInfoCircle} className="icon" />
            <span>About</span>
          </Link>
        </li>
      </ul>
    </nav>
  );
};

export default Navbar;
