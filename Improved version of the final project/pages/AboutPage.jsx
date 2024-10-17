// AboutPage.jsx
import React from "react";
import "./AboutPage.css"; 
import { Link } from "react-router-dom"; 


const AboutPage = () => {
    return (
      <div className="about-page">
        <div className="about-section">
          <div className="image-container">
            <img 
              src="./img/About.png" // استبدل هذا بالمسار الصحيح للصورة
              alt="About Us"
              className="profile-img" 
            />
          </div>
          <div className="text-container">
            <h1>About Us</h1>
            <div className="divider"></div>
            <p>
              Welcome to our library! We offer a wide variety of books for all readers. 
              Our mission is to promote reading and provide access to knowledge.
            </p>
            <div className="contact-info">
              <span className="phone-icon">📞</span>
              <span className="phone-number">+123 456 78910</span>
            </div>
          </div>
        </div>
      </div>
    );
  };
  
  export default AboutPage;