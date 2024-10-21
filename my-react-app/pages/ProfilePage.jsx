import React from 'react';
import './ProfilePage.css'; 

const ProfilePage = () => {
    const user = JSON.parse(localStorage.getItem("user"));

    if (!user) {
        return <div>لا توجد معلومات للمستخدم، يرجى تسجيل الدخول.</div>;
    }

    const { userName, fullName, role } = user; // استخدم المعلومات المناسبة من كائن المستخدم

    // توليد أرقام عشوائية لعدد الجوائز وعدد الكتب وعدد النقاط
    const awardsCount = Math.floor(Math.random() * 10) + 1; // عدد الجوائز (من 1 إلى 10)
    const booksCount = Math.floor(Math.random() * 100) + 1; // عدد الكتب (من 1 إلى 100)
    const pointsCount = Math.floor(Math.random() * 1000) + 1; // عدد النقاط (من 1 إلى 1000)
  
  
    return (
        <div className="wrapper">
            <div className="user-card">
                <div className="user-card-img">
                    <img src="/img/user.png" alt="Profile" />
                </div>
                <div className="user-card-info">
                    <h2>{userName}</h2>
                    <p><span>Full Name:</span>{fullName}</p>
                    <p><span>User Name:</span> {userName}</p>
                    <p><span>Role:</span> {role}</p>
                    <p><span>No. of Books:</span> {booksCount}</p>
                    <p><span>No. of Points:</span> {pointsCount}</p>
                </div>
            </div>




            
        </div>
    );
};

export default ProfilePage;































































