import React, { useEffect, useState } from "react";
import "./HomePage.css";
import axios from "axios";
import { Link } from "react-router-dom";
import Navbar from "../components/Navbar.jsx";

//  وظيفة الانتظار لحل مشكلة ظهور خطأ status 429
const sleep = (ms) => new Promise(resolve => setTimeout(resolve, ms));

const HomePage = () => {
  const [books, setBooks] = useState([]); // حالة جميع الكتب
  const [searchTerm, setSearchTerm] = useState(""); // حالة مصطلح البحث
  const [filteredBooks, setFilteredBooks] = useState([]); // حالة الكتب المفلترة

  // وظيفة جلب الكتب
  const fetchBooks = async () => {
    const queries = [
      "Detective novels",
      "Van Gogh",
      "فلسطين",
      "Art HISTORY books",
      "Self development",
      "تنمية بشرية",
      "كتب دينية إسلامية",
      "أدب مقاوم",
      "technology",
      "AI",
      "science"
    ];

    const allBooks = [];

    for (const query of queries) {
      try {
        const response = await axios.get(`https://www.googleapis.com/books/v1/volumes?q=${query}&maxResults=40`);
        if (response.data.items) {
          const fetchedBooks = response.data.items.map(item => ({
            id: item.id,
            title: item.volumeInfo.title,
            author: item.volumeInfo.authors ? item.volumeInfo.authors.join(', ') : 'Unknown Author',
            coverUrl: item.volumeInfo.imageLinks ? item.volumeInfo.imageLinks.thumbnail : null // استخدم null إذا لم يكن هناك صورة
          }));

          allBooks.push(...fetchedBooks); // إضافة الكتب المستخرجة إلى مصفوفة واحدة
        }
      } catch (error) {
        if (error.response && error.response.status === 429) {
          alert("Too many requests. Please try again later.");
        } else {
          console.error(`Error fetching books for query "${query}":`, error);
        }
      }
      await sleep(1000); // الانتظار لمدة ثانية بين الطلبات
    }

    // تصفية الكتب للتأكد من أن العناوين تحتوي على أربعة كلمات أو أقل ولديها صورة غلاف
    const filteredBooks = allBooks.filter(book => {
      const titleWords = book.title.split(' ');
      return titleWords.length <= 4 && book.coverUrl; // الشرط لعنوان يحتوي على أربعة كلمات أو أقل وصورة غلاف
    });

    setBooks(filteredBooks); // تعيين الكتب المفلترة
    setFilteredBooks(filteredBooks); // تعيين الكتب المفلترة للعرض
  };

  // جلب جميع الكتب عند تحميل المكون
  useEffect(() => {
    fetchBooks();
  }, []);

  // تصفية الكتب بناءً على مصطلح البحث
  useEffect(() => {
    if (searchTerm) {
      const filtered = books.filter(book => 
        book.title.toLowerCase().includes(searchTerm.toLowerCase())
      );
      setFilteredBooks(filtered); // تحديث حالة الكتب المفلترة
    } else {
      setFilteredBooks(books); // إذا لم يكن هناك مصطلح بحث، عرض جميع الكتب
    }
  }, [searchTerm, books]); // الاعتماد على الكتب لضمان عمل التصفية بعد الجلب

  return (
    <div>
      <Navbar /> {/* استدعاء الـNavbar هنا */}
    
      <div className="main-container">
        <div className="content">
          <div className="search-bar">
            <input
              type="text"
              placeholder="Enter Book Name..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
          <h1>Books Collection</h1>
          <div className="book-grid">
            {filteredBooks.map(book => (
              <div key={book.id} className="book-card">
                <Link to={`/book/${book.id}`}>
                  <img src={book.coverUrl} alt={book.title} className="book-cover" />
                  <h3>{book.title}</h3>
                  <p>{book.author}</p>
                </Link>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default HomePage;






// const HomePage = () => {
//   const [books, setBooks] = useState([]);
//   const [searchTerm, setSearchTerm] = useState("");

//   // Fetch books from the API
//   useEffect(() => {
//     axios.get("{{api_url}}/api/Book/GetBooks")
//       .then((response) => {
//         setBooks(response.data);
//       })
//       .catch((error) => {
//         console.error("There was an error fetching the books!", error);
//       });
//   }, []);

//   // Filter books based on search input
//   const filteredBooks = books.filter(book =>
//     book.title.toLowerCase().includes(searchTerm.toLowerCase())
//   );

//   return (
//     <div className="home-page">
//       <header className="header">
//         <input
//           type="text"
//           placeholder="Enter Book Name..."
//           value={searchTerm}
//           onChange={(e) => setSearchTerm(e.target.value)}
//           className="search-bar"
//         />
//         <button className="search-button">Search</button>
//       </header>
//       <div className="book-grid">
//         {filteredBooks.length > 0 ? (
//           filteredBooks.map((book) => (
//             <div key={book.id} className="book-card">
//               <Link to={`/book/${book.id}`}>
//                 <img src={book.coverImage} alt={book.title} className="book-cover" />
//                 <h3>{book.title}</h3>
//                 <p>{book.author}</p>
//               </Link>
//               {book.isIssued && <span className="issued-badge">Issued Book</span>}
//             </div>
//           ))
//         ) : (
//           <p>No books available.</p>
//         )}
//       </div>
//     </div>
//   );
// };

// export default HomePage;











































































































































































































// // HomePage.jsx
// function HomePage(){
// return (<>
// <p>Home Page </p>
// </>
// )
// }

// export default HomePage; 