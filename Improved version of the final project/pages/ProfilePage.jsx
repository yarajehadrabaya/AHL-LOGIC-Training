import React from "react";
import "./ProfilePage.css"; // استيراد ملف CSS
import Navbar from "../components/Navbar.jsx"; // استدعاء ناف بار
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUser } from '@fortawesome/free-solid-svg-icons';

const ProfilePage = () => {
  // تحديد معلومات المستخدم
  const userInfo = {
    username: "IARA",
    fullName: "Hembo Tingor",
    password: "securepassword123", // يجب عدم عرض كلمة المرور في الإنتاج
    email: "rntng@gmail.com",
    phone: "98979989898",
    userType: 'student' // قم بتغييرها إلى 'admin' لعرض ناف بار الإداري
  };

  return (
    <div>
      <Navbar userType={userInfo.userType} />

      <div className="main-container-profile">
        <div className="content-profile">
          <div className="card-profile">
            <div className="image-container-profile">
              <FontAwesomeIcon icon={faUser} className="icon-userinfo" />
            </div>
            <h2 className="welcome-message-profile">HI, "<span className="username-profile">{userInfo.username}</span>"!</h2>
            
              <div className="user-details-profile">
               <div className="detail-row-profile">
                <div className="label-profile">Full Name:</div>
                <div className="value-profile">{userInfo.fullName}</div>
               </div>
               <div className="detail-row-profile">
                <div className="label-profile">Password:</div>
                <div className="value-profile">{userInfo.password}</div>
              </div>
              
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProfilePage; 

