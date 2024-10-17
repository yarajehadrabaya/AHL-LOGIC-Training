// App.jsx

import { BrowserRouter, Routes, Route } from "react-router-dom";
import LoginPage from "../pages/LoginPage";
import RegisterPage from "../pages/RegisterPage"; 
import HomePage from "../pages/HomePage"; 
import AboutPage from "../pages/AboutPage";  
import BookDetailPage from "../pages/BookDetailPage"; // إضافة استيراد صفحة تفاصيل الكتاب

function App() {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/register" element={<RegisterPage />} />
          <Route path="/about" element={<AboutPage />} /> 
          <Route path="/book/:id" element={<BookDetailPage />} /> {/* إضافة مسار تفاصيل الكتاب */}
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
