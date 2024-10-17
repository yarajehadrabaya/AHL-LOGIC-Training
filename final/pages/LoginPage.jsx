// LoginPage.jsx

import React from 'react';
import './LoginPage.css';

function LoginPage() {
  return (
    <div className="login-container">
      <div className="login-box">
        <h1>Login</h1>
        <label htmlFor="username">Username</label>
        <input type="text" id="username" placeholder="Username" />
        <label htmlFor="password">Password</label>
        <input type="password" id="password" placeholder="Password" />
        <button className="login-button">Login</button>
      </div>
    </div>
  );
}

export default LoginPage;
