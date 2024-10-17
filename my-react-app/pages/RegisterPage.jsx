// RegisterPage.jsx

import React, { useState } from 'react';
import './RegisterPage.css';

function RegisterPage() {
    const [username, setUsername] = useState('');
    const [fullname, setFullname] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const [successMessage, setSuccessMessage] = useState('');

    const handleRegister = async (e) => {
        e.preventDefault(); // منع إعادة تحميل الصفحة
        setError(''); // إعادة تعيين رسالة الخطأ
        setSuccessMessage(''); // إعادة تعيين رسالة النجاح

        try {
            const response = await fetch('https://libraryforstd-d5epbbadfwc3hygk.eastasia-01.azurewebsites.net/api/Account/CreateUser', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ username, fullname, password }),
            });

            if (!response.ok) {
                const errorData = await response.json();
                throw new Error(errorData.message || 'Registration failed!');
            }

            const data = await response.json();
            console.log('Registration successful:', data);

            // هنا يمكنك تخزين التوكين إذا تم إرجاعه
            localStorage.setItem('token', data.token); // استبدل 'data.token' بالتوكين الصحيح من الاستجابة

            // رسالة نجاح
            setSuccessMessage('Registration successful! You can now log in.');
            // هنا يمكنك تنفيذ ما تريد بعد نجاح التسجيل مثل توجيه المستخدم

        } catch (error) {
            setError(error.message);
        }
    };

    return (
        <div className="register-container">
            <div className="register-box">
                <h1>Register</h1>
                {error && <p style={{ color: 'red' }}>{error}</p>}
                {successMessage && <p style={{ color: 'green' }}>{successMessage}</p>}
                
                <form onSubmit={handleRegister}>
                    <label htmlFor="username">Username</label>
                    <input type="text" placeholder="Username" id="username" value={username} onChange={(e) => setUsername(e.target.value)} required />
                    
                    <label htmlFor="fullname">Full Name</label>
                    <input type="text" placeholder="Full Name" id="fullname" value={fullname} onChange={(e) => setFullname(e.target.value)} required />
                    
                    <label htmlFor="password">Password</label>
                    <input type="password" placeholder="Password" id="password" value={password} onChange={(e) => setPassword(e.target.value)} required />
                    
                    <button className="register-button" type="submit">Register</button>
                </form>

                <p style={{ textAlign: 'center', marginTop: '15px' }}>
                    Already have an account? <a href="/login" style={{ color: '#ff5500', textDecoration: 'underline' }}>Login here</a>
                </p>
            </div>
        </div>
    );
}

export default RegisterPage;
