import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom'; 
import './RegisterPage.css';

function RegisterPage() {
    const [username, setUsername] = useState('');
    const [fullname, setFullname] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const [successMessage, setSuccessMessage] = useState('');
    const navigate = useNavigate(); 

    const handleRegister = async (e) => {
        e.preventDefault();
        setError('');
        setSuccessMessage('');

        try {
            const response = await axios.post('https://ahllibrary.azurewebsites.net/api/Account/CreateUser', {
                username,
                fullname,
                password
            });

            console.log('Registration successful:', response.data);

            localStorage.setItem("token", response.data.token);
            setSuccessMessage('Registration successful! You can now log in.');
        // Redirect the user to the login page, passing a state after registration
        setTimeout(() => {
            navigate('/login', { state: { fromRegister: true } });
        }, 2000); // Redirect the user after 2 seconds
        } catch (error) {
            console.error('Error during registration:', error);
            setError(error.response?.data?.message || 'Registration failed!');
        }

    };

    return (
        <div className="register-container">
            <div className="register-box">
                <h1>Register</h1>
                {error && <p style={{ color: 'red' }}>{error}</p>}
                {successMessage && <p style={{ color: 'green' }}>{successMessage}</p>}
                
                <form onSubmit={handleRegister}>
                    <label htmlFor="username">Username</label>
                    <input
                        type="text"
                        placeholder="Username"
                        id="username"
                        value={username}
                        onChange={(e) => setUsername(e.target.value)}
                        required
                    />
                    
                    <label htmlFor="fullname">Full Name</label>
                    <input
                        type="text"
                        placeholder="Full Name"
                        id="fullname"
                        value={fullname}
                        onChange={(e) => setFullname(e.target.value)}
                        required
                    />
                    
                    <label htmlFor="password">Password</label>
                    <input
                        type="password"
                        placeholder="Password"
                        id="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        required
                    />
                    
                    <button className="register-button" type="submit">Register</button>
                </form>

                <p style={{ textAlign: 'center', marginTop: '15px' }}>
                    Already have an account? <a href="/login" style={{ color: '#ff5500', textDecoration: 'underline' }}>Login here</a>
                </p>
            </div>
        </div>
    );
}

export default RegisterPage;
