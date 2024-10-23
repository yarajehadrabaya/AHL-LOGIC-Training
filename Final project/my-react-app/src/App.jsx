import React, { useState } from 'react';
import { BrowserRouter, Routes, Route } from "react-router-dom";
import LoginPage from "../pages/LoginPage";
import RegisterPage from "../pages/RegisterPage"; 
import HomePage from "../pages/HomePage"; 
import AboutPage from "../pages/AboutPage";  
import BookDetailPage from "../pages/BookDetailPage"; 
import ProfilePage from "../pages/ProfilePage";  
import BookList from "../pages/BookListPage"; 
import MyBooks from "../pages/MyBooksPage"; 
import Navbar from "../components/Navbar"; 
import Footer from "../components/Footer";  // استيراد الفوتر
import { ToastContainer } from 'react-toastify';

function App() {
  const [userType, setUserType] = useState(null); // استخدام الحالة لتحديد نوع المستخدم

  return (
    <BrowserRouter>
      <Navbar /> {/* إضافة Navbar هنا ليظهر في جميع الصفحات */}
      <ToastContainer />
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/login" element={<LoginPage setUserType={setUserType} />} />
        <Route path="/register" element={<RegisterPage />} />
        <Route path="/about" element={<AboutPage />} />
        <Route path="/book/:id" element={<BookDetailPage />} /> {/* إضافة معرف الكتاب */}
        
        <Route path="/book_list" element={<BookList />} /> 

        <Route path="/profile" element={<ProfilePage />} /> 

        <Route path="/my_books" element={<MyBooks />} />
      </Routes>
      <Footer /> 
    </BrowserRouter>
  );
}

export default App;
