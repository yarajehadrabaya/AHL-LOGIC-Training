// RegisterPage.jsx

import React from 'react';
import './RegisterPage.css'; // Make sure to import your CSS

function RegisterPage() {
    return (
        <div className="register-container">
            <div className="register-box">
                <h1>Register</h1>
                <label htmlFor="username">Username</label>
                <input type="text" placeholder="Username" id="username" />
                
                <label htmlFor="fullname">Full Name</label>
                <input type="text" placeholder="Full Name" id="fullname" />
                
                <label htmlFor="password">Password</label>
                <input type="password" placeholder="Password" id="password" />
                
                <button className="register-button">Register</button>
                
                <p style={{ textAlign: 'center', marginTop: '15px' }}>
                    Already have an account? <a href="/login" style={{ color: '#ff5500', textDecoration: 'underline' }}>Login here</a>
                </p>
            </div>
        </div>
    );
}

export default RegisterPage;
