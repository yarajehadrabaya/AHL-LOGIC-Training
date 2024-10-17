import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import './BookDetailPage.css'; // استيراد ملف CSS

const BookDetailPage = () => {
  const { id } = useParams(); // الحصول على id الكتاب من المعاملات
  const [book, setBook] = useState({
    title: "",
    author: "",
    price: 0,
    isAvailable: false,
    photoPath: "",
  });

  const apiUrl = `https://ahllibrary.azurewebsites.net/api/Book/GetBook/${id}`;

  useEffect(() => {
    // استدعاء API لجلب بيانات الكتاب
    fetch(apiUrl)
      .then((response) => response.json())
      .then((data) => {
        // تعيين بيانات الكتاب على الحالة
        setBook({
          title: data.title,
          author: data.author,
          price: data.price,
          isAvailable: data.isAvaliable,
          photoPath: `https://ahllibrary.azurewebsites.net/${data.photoPath}`, // مسار الصورة من الـ API
        });
      })
      .catch((error) => console.error("Error fetching book details:", error));
  }, [id, apiUrl]); // تحديث عند تغيير id

  return (
    <div className="container_detail book-detail-container">
      <div className="row justify-content-center">
        <div className="col-md-40"> {/* زيادة عرض العمود */}
          <div className="cardd mt-4 shadow">
            <img
              src={book.photoPath || "https://via.placeholder.com/400x600"}
              alt="Book Cover"
              className="card-img-top img-fluid"
            />
            <div className="card-body text-center">
              <h2 className="card-title">{book.title}</h2>
              <p className="card-text">Author: {book.author}</p>
              <p className="card-text">Price: {book.price} $ </p>
              <p className="card-text">Available: {book.isAvailable ? 'Yes' : 'No'}</p>
              <button className="btn btn-primary" disabled={!book.isAvailable}>
                {book.isAvailable ? 'Borrow This Book' : 'Not available, you cannot borrow it.'}
              </button>
            </div>
            <div>
              
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BookDetailPage;
