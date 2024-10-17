import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import './AddBookPage.css'; 

function AddBook() {
  const [formValue, setFormValue] = useState({
    title: '',
    author: '',
    price: '',
    isAvailable: true,
  });
  const [message, setMessage] = useState();
  const navigate = useNavigate();

  const handleInput = (e) => {
    const { name, value, type, checked } = e.target;
    setFormValue({
      ...formValue,
      [name]: type === "checkbox" ? checked : value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const allInputValue = {
      title: formValue.title,
      author: formValue.author,
      price: parseFloat(formValue.price), // تحويل السعر إلى رقم
      isAvailable: formValue.isAvailable,
    };

    let res = await fetch("https://ahllibrary.azurewebsites.net/api/Book/AddBook", {
      method: "POST",
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${localStorage.getItem("token")}`, // إضافة التوكن في الهيدر
      },
      body: JSON.stringify(allInputValue),
    });

    let resjson = await res.json();
    if (res.status === 200) {
      setMessage("Book added successfully!");
      setTimeout(() => {
        navigate('/'); // الانتقال إلى صفحةاالهوم بعد 2 ثانية
      }, 2000);
    } else {
      setMessage("Some Error Occurred");
    }
  };

  return (
    <div className="add-book-container">
            <div className="spacer"></div>
      <div className="add-book">
        <h1>Add New Book</h1>
        <p className="text-success">{message}</p>
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label htmlFor="title">Title</label>
            <input
              type="text"
              name="title"
              className="form-control"
              value={formValue.title}
              onChange={handleInput}
              placeholder="Enter book title"
              required
            />
          </div>
          <div className="form-group">
            <label htmlFor="author">Author</label>
            <input
              type="text"
              name="author"
              className="form-control"
              value={formValue.author}
              onChange={handleInput}
              placeholder="Enter author's name"
              required
            />
          </div>
          <div className="form-group">
            <label htmlFor="price">Price</label>
            <input
              type="number"
              name="price"
              className="form-control"
              value={formValue.price}
              onChange={handleInput}
              placeholder="Enter price"
              required
            />
          </div>
          <div className="form-group">
            <label htmlFor="isAvailable">Available</label>
            <input
              type="checkbox"
              name="isAvailable"
              className="form-check-input"
              checked={formValue.isAvailable}
              onChange={handleInput}
            />
          </div>
          <button type="submit" className="login-button">Add Book</button>
        </form>
      </div>
    </div>
  );
}

export default AddBook;



