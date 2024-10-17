// / // components/Navbar.jsx

// // components/Navbar.jsx
// import React, { useEffect } from 'react';
// import { Link } from 'react-router-dom';
// import $ from 'jquery'; // استيراد jQuery
// import './Navbar.css';
// import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
// import { faHome, faUser, faSignOutAlt, faInfoCircle, faBook } from '@fortawesome/free-solid-svg-icons'; // استيراد الأيقونات

// function Navbar() {
//   useEffect(() => {
//     const body = document.querySelector("body");
//     const navbar = document.querySelector(".navbar");
//     const menuBtn = document.querySelector(".menu-btn");
//     const cancelBtn = document.querySelector(".cancel-btn");

//     // عند النقر على زر القائمة، يظهر الشريط الجانبي
//     menuBtn.onclick = () => {
//       navbar.classList.add("show");
//       menuBtn.classList.add("hide");
//       body.classList.add("disabled");
//     };

//     // عند النقر على زر الإلغاء، يتم إخفاء الشريط الجانبي
//     cancelBtn.onclick = () => {
//       body.classList.remove("disabled");
//       navbar.classList.remove("show");
//       menuBtn.classList.remove("hide");
//     };

//     // عند التمرير، يتم إضافة أو إزالة الفئة 'sticky' بناءً على موقع التمرير
//     window.onscroll = () => {
//       if (window.scrollY > 20) {
//         navbar.classList.add("sticky");
//       } else {
//         navbar.classList.remove("sticky");
//       }
//     };

//     // تنظيف المتغيرات عند إلغاء تحميل المكون
//     return () => {
//       window.onscroll = null;
//     };
//   }, []); // استخدام [] لضمان تنفيذ الكود مرة واحدة فقط عند تحميل المكون
  
  
  
//   // Function to check if the user is logged in
//   function isLoggedIn() {
//     const token = localStorage.getItem("token");
//     return token !== null;
//   }

//   // Function to check if the user is an admin
//   function isAdmin() {
//     const user = JSON.parse(localStorage.getItem("user"));
//     return user && user.role === "Admin"; // تأكد من أن البيانات غير فارغة وأن role هو "Admin"
//   }

//   // Logout function
//   function logout() {
//     localStorage.removeItem("token"); // مسح التوكن
//     localStorage.removeItem("user"); // مسح معلومات المستخدم (اختياري)
//     navigate("/login"); // الانتقال إلى صفحة تسجيل الدخول
// }


//   return (
//     <nav className="navbar">
//       <div className="content-nav">
//       <div className="logo-nav">
//           <Link to="/" >IARA</Link>
//         </div>
//       <ul className="menu-list">
//           <div className="icon cancel-btn" onClick={() => {
//             $(".navbar").removeClass("show");
//             $("body").removeClass("disabled");
//           }}>
//             <i className="fas fa-times"></i>
//           </div>
//           <li><Link to="/">Home</Link></li>
//           <li><Link to="/about">About</Link></li>
        
//           {isLoggedIn() && isAdmin() && (
//             <>
//                 <li><Link to="/add_book">Add Book</Link></li>
//               <li><Link to="/">Delete Book</Link></li>
//               <li><Link to="/">Update Book</Link></li>
//             </>
//           )}

//           {isLoggedIn() ? (
//             <>
//               <li><Link to="/profile">Profile</Link></li>
//               <li><Link to="/" onClick={logout}>Logout</Link></li>
//             </>
//           ) : (
//             <>
//               <li><Link to="/login">Login</Link></li>
//               <li><Link to="/register">Register</Link></li>
//             </>
//           )}
//         </ul>
//         <div className="icon menu-btn" onClick={() => {
//           $(".navbar").addClass("show");
//           $("body").addClass("disabled");
//         }}>
//           <i className="fas fa-bars"></i>
//         </div>
//         <div className="logo">
//           {/* <a href="#">IARA</a> */}
//         </div>
        
//        <div></div>
//        <div></div>
//       </div>
//     </nav>
//   );
// }

// export default Navbar;




import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import $ from 'jquery'; // استيراد jQuery
import './Navbar.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHome, faUser, faSignOutAlt, faInfoCircle, faBook } from '@fortawesome/free-solid-svg-icons'; // استيراد الأيقونات

function Navbar() {
  const [loggedIn, setLoggedIn] = useState(false); // حالة تسجيل الدخول
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem("token");
    setLoggedIn(token !== null); // تحديث الحالة بناءً على وجود التوكن

    const body = document.querySelector("body");
    const navbar = document.querySelector(".navbar");
    const menuBtn = document.querySelector(".menu-btn");
    const cancelBtn = document.querySelector(".cancel-btn");

    // عند النقر على زر القائمة، يظهر الشريط الجانبي
    menuBtn.onclick = () => {
      navbar.classList.add("show");
      menuBtn.classList.add("hide");
      body.classList.add("disabled");
    };

    // عند النقر على زر الإلغاء، يتم إخفاء الشريط الجانبي
    cancelBtn.onclick = () => {
      body.classList.remove("disabled");
      navbar.classList.remove("show");
      menuBtn.classList.remove("hide");
    };

    // عند التمرير، يتم إضافة أو إزالة الفئة 'sticky' بناءً على موقع التمرير
    window.onscroll = () => {
      if (window.scrollY > 20) {
        navbar.classList.add("sticky");
      } else {
        navbar.classList.remove("sticky");
      }
    };

    // تنظيف المتغيرات عند إلغاء تحميل المكون
    return () => {
      window.onscroll = null;
    };
  }, []); // استخدام [] لضمان تنفيذ الكود مرة واحدة فقط عند تحميل المكون
  
  // Function to check if the user is an admin
  function isAdmin() {
    const user = JSON.parse(localStorage.getItem("user"));
    return user && user.role === "Admin"; // تأكد من أن البيانات غير فارغة وأن role هو "Admin"
  }

  // Logout function
  function logout() {
    localStorage.removeItem("token"); // مسح التوكن
    localStorage.removeItem("user"); // مسح معلومات المستخدم (اختياري)
    setLoggedIn(false); // تحديث حالة تسجيل الدخول
    navigate("/login"); // الانتقال إلى صفحة تسجيل الدخول
  }

  return (
    <nav className="navbar">
      <div className="content-nav">
        <div className="logo-nav">
          <Link to="/">IARA</Link>
        </div>
        <ul className="menu-list">
          <div className="icon cancel-btn" onClick={() => {
            $(".navbar").removeClass("show");
            $("body").removeClass("disabled");
          }}>
            <i className="fas fa-times"></i>
          </div>
          <li><Link to="/">Home</Link></li>
          <li><Link to="/about">About</Link></li>
        
          {loggedIn && isAdmin() && (
            <>
              <li><Link to="/add_book">Add Book</Link></li>
              <li><Link to="/">Delete Book</Link></li>
              <li><Link to="/">Update Book</Link></li>
            </>
          )}

          {loggedIn ? (
            <>
              <li><Link to="/profile">Profile</Link></li>
              <li><Link to="/" onClick={logout}>Logout</Link></li>
            </>
          ) : (
            <>
              <li><Link to="/login">Login</Link></li>
              <li><Link to="/register">Register</Link></li>
            </>
          )}
        </ul>
        <div className="icon menu-btn" onClick={() => {
          $(".navbar").addClass("show");
          $("body").addClass("disabled");
        }}>
          <i className="fas fa-bars"></i>
        </div>
        <div className="logo"></div>
        <div></div>
        <div></div>
      </div>
    </nav>
  );
}

export default Navbar;
