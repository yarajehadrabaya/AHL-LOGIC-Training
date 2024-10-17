import React, { useState } from 'react';
import { BrowserRouter, Routes, Route } from "react-router-dom";
import LoginPage from "../pages/LoginPage";
import RegisterPage from "../pages/RegisterPage"; 
import HomePage from "../pages/HomePage"; 
import AboutPage from "../pages/AboutPage";  
import BookDetailPage from "../pages/BookDetailPage"; 
import ProfilePage from "../pages/ProfilePage";  // إضافة استيراد صفحة البروفايل
import Navbar from "../components/Navbar"; 

function App() {
  const [userType, setUserType] = useState(null);

  return (
    <>
      <BrowserRouter>
        {userType && <Navbar userType={userType} />} 
        <Routes>
          <Route path="/" element={<LoginPage setUserType={setUserType} />} />
          <Route path="/home" element={<HomePage />} />
          <Route path="/login" element={<LoginPage setUserType={setUserType} />} />
          <Route path="/register" element={<RegisterPage />} />
          <Route path="/about" element={<AboutPage />} />
          <Route path="/book/:id" element={<BookDetailPage />} />
          <Route path="/profile" element={<ProfilePage />} />  {/* إضافة مسار صفحة البروفايل */}
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;


