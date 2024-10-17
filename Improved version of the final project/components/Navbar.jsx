/* components/Navbar.jsx */
/* components/Navbar.jsx */

import React from 'react';
import { Link } from 'react-router-dom';
import './Navbar.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHome, faUser, faSignOutAlt, faInfoCircle,faBook,faPlus,faTrash, faClipboardList} from '@fortawesome/free-solid-svg-icons'; // استيراد الأيقونات



function Navbar(){function isLoggedIn() {
  const token = localStorage.getItem("token");
  return token !== null;
}

function isAdmin() {
  const user = JSON.parse(localStorage.getItem("user"));
  if (user) {
      return user.role === "Admin";
  } else {
      return null;
  }
}

return (
  <div className="d-flex justify-content-between">
      {isLoggedIn() ? <a href="/login">login</a> : <a href="/register">register</a>}
      {isLoggedIn() && <a href="/profile">profile</a>}
      {isLoggedIn() && isAdmin() ? <a href="/add_book">addbook</a> : null}
      <a href="/about">about</a>
      <a href="/">home</a>
  </div>
);

}


export default Navbar;