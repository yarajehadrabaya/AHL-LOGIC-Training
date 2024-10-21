import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import './BookDetailPage.css';
import axios from 'axios';

const BookDetailPage = () => {
  const { id } = useParams();
  const [book, setBook] = useState({
    title: "",
    author: "",
    price: 0,
    isAvailable: false,
    photoPath: "",
    userId: "", // إضافة حقل userId
  });

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isReturnModalOpen, setIsReturnModalOpen] = useState(false);
  const BASE_URL = 'https://ahllibrary.azurewebsites.net'; // URL الأساسي


  const apiUrl = `https://ahllibrary.azurewebsites.net/api/Book/GetBook/${id}`;
  const currentUserId = localStorage.getItem("userId"); // افترض أنك خزنت userId في localStorage

  useEffect(() => {
    console.log("Fetching book data for id:", id);
    axios.get(apiUrl)
      .then((response) => {
        const data = response.data;
        console.log("Book data received:", data);
        setBook({
          title: data.title,
          author: data.author,
          price: data.price,
          isAvailable: data.isAvaliable,
          photoPath: `https://ahllibrary.azurewebsites.net/${data.photoPath}`,
          userId: data.userId, // تخزين userId الخاص بالكتاب
        });
      })
      .catch((error) => console.error("Error fetching book details:", error));
  }, [id, apiUrl]);

  const borrowBook = () => {
    console.log("Borrow button clicked for book ID:", id);
    setIsModalOpen(true);
  };

  const confirmBorrowBook = () => {
    const token = localStorage.getItem("token");
    const borrowApiUrl = `https://ahllibrary.azurewebsites.net/api/Book/BuyBook/${id}`;
  
    axios.get(borrowApiUrl, {
      headers: {
        'Authorization': `Bearer ${token}`,
      },
    })
    .then((response) => {
      console.log("Book borrowed successfully:", response.data);
      console.log("Current User ID:", currentUserId);
      setIsModalOpen(false);
      // تحديث حالة الكتاب بعد الاستعارة
      setBook((prevBook) => ({
        ...prevBook,
        isAvailable: false,
        userId: currentUserId, // تعيين userId الحالي للكتاب بعد الاستعارة
      }));
      alert("Book borrowed successfully!");
      // إعادة تحميل الصفحة بعد الاستعارة
      window.location.reload();
    })
    .catch((error) => {
      console.error("Error borrowing the book:", error.message);
    });
  };
  

  const returnBook = () => {
    console.log("Return button clicked for book ID:", id);
    setIsReturnModalOpen(true);
  };

  const confirmReturnBook = () => {
    const token = localStorage.getItem("token");
    const returnApiUrl = `https://ahllibrary.azurewebsites.net/api/Book/ReturnBook/${id}`;

    axios.get(returnApiUrl, {
      headers: {
        'Authorization': `Bearer ${token}`,
      },
    })
    .then((response) => {
      console.log("Book returned successfully:", response.data);
      console.log("Current User ID:", currentUserId);
      setIsReturnModalOpen(false);
      setBook((prevBook) => ({
        ...prevBook,
        isAvailable: true,
      }));
      alert("Book returned successfully!");
    })
    .catch((error) => {
      console.error("Error returning the book:", error.message);
    });
  };

  return (
    <div className="container_detail book-detail-container">
      <div className="row justify-content-center">
        <div className="col-md-40">
          <div className="cardd mt-4 shadow">
          <img
            src={book.photoPath ? `${BASE_URL}/${book.photoPath}` : "/img/default-book.png"}
            alt="Book Cover"
            className="card-img-top img-fluid"
            onError={(e) => {
              e.target.onerror = null;
              e.target.src = "/img/default-book.png";
            }}
            style={{ borderRadius: '10px 10px 0 0' }} // تأكد من أن الزوايا مستديرة
          />

            <div className="card-body text-center">
              <h2 className="card-title">{book.title}</h2>
              <p className="card-text">Author: {book.author}</p>
              <p className="card-text">Price: {book.price} $ </p>
              {/* <p className="card-text">Available: {book.isAvailable ? 'Yes' : 'No'}</p> */}
              {book.isAvailable ? (
                  <button 
                   className="btn-borrow" 
                    onClick={borrowBook}
                  >
                    Borrow This Book
                  </button>
                ) : (
                  currentUserId === book.userId ? (
                    <button 
                      className="btn-return"
                      onClick={returnBook}
                    >
                      Return This Book
                    </button>
                  ) : (
                    <button 
                      className="btn-return" 
                      disabled
                    >
                      Not Available
                    </button>
                  )
                )}

            </div>
          </div>
        </div>
      </div>

      {/* نافذة التأكيد على الاستعارة */}
      {isModalOpen && (
        <div className="modal">
          <div className="modal-content">
            <span className="close" onClick={() => setIsModalOpen(false)}>&times;</span>
            <h2>Confirm Borrowing</h2>
            <p>Are you sure you want to borrow this book?</p> 
            <button className="modal-button" onClick={confirmBorrowBook}>Confirm</button>
          </div>
        </div>
      )}

      {/* نافذة التأكيد على الإرجاع */}
      {isReturnModalOpen && (
        <div className="modal">
          <div className="modal-content">
            <span className="close" onClick={() => setIsReturnModalOpen(false)}>&times;</span>
            <h2>Confirm Return</h2>
            <p>Are you sure you want to return this book?</p> 
            <button className="modal-button" onClick={confirmReturnBook}>Confirm</button>
          </div>
        </div>
      )}
    </div>
  );
};

export default BookDetailPage;



// نسخة ال axios

// import React, { useEffect, useState } from "react";
// import { useParams } from "react-router-dom";
// import './BookDetailPage.css'; // استيراد ملف CSS
// import axios from 'axios';

// const BookDetailPage = () => {
//   const { id } = useParams(); // الحصول على id الكتاب من المعاملات
//   const [book, setBook] = useState({
//     title: "",
//     author: "",
//     price: 0,
//     isAvailable: false,
//     photoPath: "",
//   });

//   const [isModalOpen, setIsModalOpen] = useState(false); // التحكم في ظهور رسالة التأكيد

//   const apiUrl = `https://ahllibrary.azurewebsites.net/api/Book/GetBook/${id}`;

//   useEffect(() => {
//     console.log("Fetching book data for id:", id);
//     axios.get(apiUrl)
//       .then((response) => {
//         const data = response.data;
//         console.log("Book data received:", data); // تحقق من البيانات
//         setBook({
//           title: data.title,
//           author: data.author,
//           price: data.price,
//           isAvailable: data.isAvaliable,
//           photoPath: `https://ahllibrary.azurewebsites.net/${data.photoPath}`,
//         });
//       })
//       .catch((error) => console.error("Error fetching book details:", error));
//   }, [id, apiUrl]); // تحديث عند تغيير id

//   const borrowBook = () => {
//     setIsModalOpen(true); // فتح النافذة المنبثقة عند الضغط على زر الاستعارة
//   };

//   const confirmBorrowBook = () => {
//     const token = localStorage.getItem("token"); // الحصول على التوكين من التخزين المحلي
//     const borrowApiUrl = `https://ahllibrary.azurewebsites.net/api/Book/BuyBook/${id}`; // رابط API للاستعارة

//     axios.get(borrowApiUrl, {
//       headers: {
//         'Authorization': `Bearer ${token}`, // إضافة التوكين في رأس الطلب
//       },
//     })
//     .then((response) => {
//       console.log("Book borrowed successfully:", response.data);
//       setIsModalOpen(false); // إغلاق النافذة المنبثقة بعد النجاح

//       // تغيير حالة الكتاب إلى غير متاح
//       setBook((prevBook) => ({
//         ...prevBook,
//         isAvailable: false, // تحديث حالة الكتاب ليصبح غير متاح
//       }));
//     })
//     .catch((error) => {
//       console.error("Error borrowing the book:", error.message);
//     });
//   };

//   const returnBook = () => {
//     const token = localStorage.getItem("token"); // الحصول على التوكين من التخزين المحلي
//     const returnApiUrl = `https://ahllibrary.azurewebsites.net/api/Book/ReturnBook/${id}`; // رابط API للإرجاع

//     axios.get(returnApiUrl, {
//       headers: {
//         'Authorization': `Bearer ${token}`, // إضافة التوكين في رأس الطلب
//       },
//     })
//     .then((response) => {
//       console.log("Book returned successfully:", response.data);
      
//       // تغيير حالة الكتاب إلى متاح
//       setBook((prevBook) => ({
//         ...prevBook,
//         isAvailable: true, // تحديث حالة الكتاب ليصبح متاحًا مرة أخرى
//       }));
//     })
//     .catch((error) => {
//       console.error("Error returning the book:", error.message);
//     });
//   };

//   return (
//     <div className="container_detail book-detail-container">
//       <div className="row justify-content-center">
//         <div className="col-md-40"> {/* زيادة عرض العمود */}
//           <div className="cardd mt-4 shadow">
//             <img
//               src={book.photoPath || "https://via.placeholder.com/400x600"}
//               alt="Book Cover"
//               className="card-img-top img-fluid"
//             />
//             <div className="card-body text-center">
//               <h2 className="card-title">{book.title}</h2>
//               <p className="card-text">Author: {book.author}</p>
//               <p className="card-text">Price: {book.price} $ </p>
//               <p className="card-text">Available: {book.isAvailable ? 'Yes' : 'No'}</p>
//               {book.isAvailable ? (
//                 <button 
//                   className="btn btn-primary" 
//                   onClick={borrowBook} // استدعاء متغير عملية  الاستعارة عند الضغط
//                 >
//                   Borrow This Book
//                 </button>
//               ) : (
//                 <button 
//                   className="btn btn-secondary" 
//                   onClick={returnBook} // استدعاء متغير عملية  الإرجاع عند الضغط
//                 >
//                   Return This Book
//                 </button>
//               )}
//             </div>
//           </div>
//         </div>
//       </div>

//       {/* رسالة التأكيد على الاستعارة */}
//       {isModalOpen && (
//         <div className="modal">
//           <div className="modal-content">
//             <span className="close" onClick={() => setIsModalOpen(false)}>&times;</span>
//             <h2>Confirm Borrowing</h2>
//             <p>Are you sure you want to borrow this book?</p> 
//             <button className="modal-button" onClick={confirmBorrowBook}>Confirm</button>
//           </div>
//         </div>
//       )}
//     </div>
//   );
// };

// export default BookDetailPage;






