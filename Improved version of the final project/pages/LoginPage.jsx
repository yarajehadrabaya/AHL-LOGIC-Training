import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import './LoginPage.css';


  function LoginPage(){
    let username="";
    let password="";
    const navigate = useNavigate;
  
    async function login() {
      const myHeaders = new Headers();
      myHeaders.append("Content-Type", "application/json");
      
      const raw = JSON.stringify({
      "userName": username,
      "password": password
      
      });
      
      const requestoptions = {
      method: "POST",
      headers: myHeaders,
      body: raw,
      };
      
      
      const resposne = await fetch("https://libraryforstd-d5epbbadfwc3hygk.eastasia-01.azurewebsites.net/api/Account/SignIn",requestoptions);
      const data = (await resposne. json())[0];
      console.log(data)
      localStorage.setItem("token",data.token);
      localStorage.setItem("user",JSON.stringify(data));
      navigate("/")
    }
    
  return (

    <div className="login-container">

      <div className="login-box">
        <h1>Login</h1>
          <div><label htmlFor="username">Username</label>
          <input
            type="text"
            id="username"
            placeholder="Username"
            onChange={(event)=>{username=event.target.value}}
          />

          <label htmlFor="password">Password</label>
          <input
            type="password"
            id="password"
            placeholder="Password"
            onChange={(event)=>{password=event.target.value}}
          />

          <button className="login-button"  onClick={login}>Login</button></div>
          


        <p>Don't have an account? <Link to="/register">Register here</Link></p>
      </div>

      
    </div>
  );
};

export default LoginPage;
