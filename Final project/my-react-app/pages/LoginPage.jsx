import React, { useState, useEffect } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import './LoginPage.css';

function LoginPage() {
  const [username, setUsername] = useState(""); 
  const [password, setPassword] = useState(""); 
  const navigate = useNavigate(); 
  const location = useLocation();
  const [successMessage, setSuccessMessage] = useState('');

  useEffect(() => {
    if (location.state?.fromRegister) {
      setSuccessMessage("Account created successfully! Please log in.");
    }
  }, [location.state]);

  async function login() {
    const myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/json");

    const raw = JSON.stringify({
      "userName": username,
      "password": password
    });

    const requestOptions = {
      method: "POST",
      headers: myHeaders,
      body: raw,
    };

    try {
      const response = await fetch("https://ahllibrary.azurewebsites.net/api/Account/SignIn", requestOptions);
      const data = await response.json();

      if (response.ok) {
        // تخزين البيانات في localStorage
        localStorage.setItem("token", data[0].token);
        localStorage.setItem("user", JSON.stringify(data[0]));
        localStorage.setItem("userId", data[0].userId);
        
        // عرض القيم المخزنة في localStorage
        console.log("User ID stored in localStorage:", data[0].userId);
        console.log("Token stored in localStorage:", data[0].token);

        // Console log statement to verify successful login
        console.log("Login successful for user:", username);

        // Redirecting the user to the homepage
        navigate("/");
        
        // Reloading the page after login
        window.location.reload(); 
      } else {
        console.error("Login failed:", data.message || "Unknown error");
        alert(data.message || "Login failed");
      }
    } catch (error) {
      console.error("An error occurred:", error);
      alert("An error occurred. Please try again.");
    }
  }

  return (
    <div className="login-container">
      <div className="login-box">
        <h1>Login</h1>
        {successMessage && <p style={{ color: 'green' }}>{successMessage}</p>}

        <div>
          <label htmlFor="username">Username</label>
          <input
            type="text"
            id="username"
            placeholder="Username"
            onChange={(event) => setUsername(event.target.value)} 
          />

          <label htmlFor="password">Password</label>
          <input
            type="password"
            id="password"
            placeholder="Password"
            onChange={(event) => setPassword(event.target.value)} 
          />

          <button className="login-button" onClick={login}>Login</button>
        </div>

        <p>Don't have an account? <Link to="/register">Register here</Link></p>
      </div>
    </div>
  );
}

export default LoginPage;

