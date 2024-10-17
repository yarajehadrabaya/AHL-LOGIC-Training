import React, { useState } from 'react';
import { BrowserRouter, Routes, Route } from "react-router-dom";
import LoginPage from "../pages/LoginPage";
import RegisterPage from "../pages/RegisterPage"; 
import HomePage from "../pages/HomePage"; 
import AboutPage from "../pages/AboutPage";  
import BookDetailPage from "../pages/BookDetailPage"; 
import ProfilePage from "../pages/ProfilePage";  
import AddBook from "../pages/AddBookPage";

import Navbar from "../components/Navbar"; 

function App() {
  const [userType, setUserType] = useState(null); // استخدام الحالة لتحديد نوع المستخدم

  return (
    <BrowserRouter>
      <Navbar /> {/* إضافة Navbar هنا ليظهر في جميع الصفحات */}

      <Routes>
        {/* المسارات العامة */}
        <Route path="/" element={<HomePage />} />
        <Route path="/login" element={<LoginPage setUserType={setUserType} />} />
        <Route path="/register" element={<RegisterPage />} />
        <Route path="/about" element={<AboutPage />} />
        <Route path="/book/:id" element={<BookDetailPage />} /> {/* إضافة معرف الكتاب */}

        {/* المسارات الخاصة */}
        <Route path="/profile" element={<ProfilePage />} /> 

        {/* إضافة مسار AddBook وظهوره فقط إذا كان المستخدم admin */}
        <Route path="/add_book" element={<AddBook />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;



