import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import './LoginPage.css';

function LoginPage() {
  const [username, setUsername] = useState(""); // استخدام useState لتخزين اسم المستخدم
  const [password, setPassword] = useState(""); // استخدام useState لتخزين كلمة المرور
  const navigate = useNavigate(); // استدعاء useNavigate كدالة

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
      console.log("Response data:", data); // طباعة البيانات المستلمة

      if (response.ok) { // التحقق من نجاح الاستجابة
        localStorage.setItem("token", data[0].token);
        console.log("Token stored:", data[0].token); // تحقق من قيمة التوكن المخزنة

        localStorage.setItem("user", JSON.stringify(data));
        navigate("/"); // الانتقال إلى الصفحة الرئيسية
      } else {
        console.error("Login failed:", data); // طباعة رسالة الخطأ في حال فشل تسجيل الدخول
        alert(data.message || "Login failed"); // عرض رسالة الخطأ
      }
    } catch (error) {
      console.error("An error occurred:", error); // طباعة الخطأ في حال وجود مشكلة في الطلب
      alert("An error occurred. Please try again."); // عرض رسالة للمستخدم
    }
  }

  return (
    <div className="login-container">
      <div className="login-box">
        <h1>Login</h1>
        <div>
          <label htmlFor="username">Username</label>
          <input
            type="text"
            id="username"
            placeholder="Username"
            onChange={(event) => setUsername(event.target.value)} // تحديث الحالة باستخدام setUsername
          />

          <label htmlFor="password">Password</label>
          <input
            type="password"
            id="password"
            placeholder="Password"
            onChange={(event) => setPassword(event.target.value)} // تحديث الحالة باستخدام setPassword
          />

          <button className="login-button" onClick={login}>Login</button>
        </div>

        <p>Don't have an account? <Link to="/register">Register here</Link></p>
      </div>
    </div>
  );
}

export default LoginPage;
