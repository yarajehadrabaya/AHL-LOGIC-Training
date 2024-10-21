import React, { useEffect, useState } from "react";
import "./HomePage.css";
import { Link, useNavigate } from "react-router-dom";
import Navbar from "../components/Navbar.jsx";

const HomePage = () => {
  const [books, setBooks] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [filteredBooks, setFilteredBooks] = useState([]);
  const [isNavbarOpen, setNavbarOpen] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const navigate = useNavigate(); // استخدام useNavigate للتنقل

  const BASE_URL = 'https://ahllibrary.azurewebsites.net'; // URL الأساسي

  useEffect(() => {
    const fetchBooks = async () => {
      try {
        const response = await fetch(`${BASE_URL}/api/Book/GetBooks`);
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        const data = await response.json();
        setBooks(data);
        setFilteredBooks(data);
      } catch (error) {
        setErrorMessage("An error occurred while fetching data: " + error.message);
      }
    };

    fetchBooks();
  }, []);

  useEffect(() => {
    if (searchTerm) {
      const filtered = books.filter(book =>
        book.title.toLowerCase().includes(searchTerm.toLowerCase())
      );
      setFilteredBooks(filtered);
      setErrorMessage(filtered.length === 0 ? "There are no books that match your search." : "");
    } else {
      setFilteredBooks(books);
      setErrorMessage("");
    }
  }, [searchTerm, books]);

  const toggleNavbar = () => {
    setNavbarOpen(!isNavbarOpen);
  };

  const handleKeyPress = (event) => {
    if (event.key === 'Enter') {
      document.getElementById("books").scrollIntoView({ behavior: 'smooth' });
    }
  };

  // دالة التحقق من تسجيل الدخول
  const handleBorrowClick = (bookId) => {
    const token = localStorage.getItem("token");

    if (!token) {
      alert("You must be logged in to borrow a book."); // عرض رسالة للمستخدم
      navigate("/login"); // توجيه المستخدم إلى صفحة تسجيل الدخول
    } else {
      navigate(`/book/${bookId}`); // التوجه إلى صفحة الكتاب
    }
  };

  return (
    <div>
      {/* <Navbar userType="student" toggleNavbar={toggleNavbar} isOpen={isNavbarOpen} /> */}
      
      <div className="main-container">
        <div className="search-section" style={{ backgroundImage: 'url("/img/poster.png")' }}>
          <div className="logo">
            <img src="/img/logo.png" alt="Site Logo" />
          </div>
          <h2 className="text1">Unlock the magic of reading..</h2>
          <p className="text">Explore our diverse collection of books!</p>
          <div className="search-bar">
            <input
              type="text"
              placeholder="Enter Book Name..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              onKeyPress={handleKeyPress}
              
            />
            <i className="search-icon fas fa-search"></i> 
          </div>

          {/* {errorMessage && <p className="error-message">{errorMessage}</p>}  */}
        </div>

        <section className="book-categories" id="book-categories">
          <div className="container">
            <div className="title">
              <h2  style={{ color: '#cc9240' }}>Book Categories</h2>
              {/* <p>Discover inspiration and change with our curated books – unlock new horizons and embark on limitless growth!</p> */}
            </div>

            <div className="cards">
              <div className="card">
                <p>01</p>
                <h3>Novels and stories</h3>
                <p>Lorem ipsum dolor sit amet consectetur.</p>
                <button><img src="/img/arrow.svg" alt="arrow-icon" /></button>
              </div>
              <div className="card">
                <p>02</p>
                <h3>Technology and Internet</h3>
                <p>Lorem ipsum dolor sit amet consectetur.</p>
                <button><img src="/img/arrow.svg" alt="arrow-icon" /></button>
              </div>
              <div className="card">
                <p>03</p>
                <h3>Scientific books</h3>
                <p>Lorem ipsum dolor sit amet consectetur.</p>
                <button><img src="/img/arrow.svg" alt="arrow-icon" /></button>
              </div>
              <div className="card">
                <p>04</p>
                <h3>Psychology and<br /> self-development</h3>
                <p>Lorem ipsum dolor sit amet consectetur.</p>
                <button><img src="/img/arrow.svg" alt="arrow-icon" /></button>
              </div>
              <div className="card">
                <p>05</p>
                <h3>Arts</h3>
                <p>Lorem ipsum dolor sit amet consectetur.</p>
                <button><img src="/img/arrow.svg" alt="arrow-icon" /></button>
              </div>
              <div className="card">
                <p>06</p>
                <h3>Children's books</h3>
                <p>Lorem ipsum dolor sit amet consectetur.</p>
                <button><img src="/img/arrow.svg" alt="arrow-icon" /></button>
              </div>
            </div>
          </div>
        </section>

        <section className="our-books" id="books">
          <div className="container">
            <div className="tittle">
              <h2   style={{ color: '#cc9240' }}>Our BOOKS</h2>
            </div>

              <div className="books">
                {filteredBooks.length > 0 ? (
                  filteredBooks.map(book => (
                    <div key={book.id} className="course">
                      <Link to={`/book/${book.id}`}>
                      <img
                  src={book.photoPath && book.photoPath.trim() !== "" ? `${BASE_URL}/${book.photoPath}` : "/img/default-book.png"}
                  alt="Book Cover"
                  className="card-img-top img-fluid"
                  onError={(e) => {
                    e.target.onerror = null; // لمنع حدوث حلقة لا نهائية
                    e.target.src = "/img/default-book.png"; // تعيين الصورة الافتراضية
                  }}
                />

                        <p className="author">{book.author}</p>
                        <h3>{book.title}</h3>
                      </Link>
                      <button onClick={() => handleBorrowClick(book.id)}>Borrow it</button>
                    </div>
                  ))
                ) : (
                  <div className="error-container">
                    <p className="error-message">{errorMessage}</p>
                  </div>
                )}
              </div>

          </div>
        </section>
        <section class="Our-testimonials" id="testimonial">
        <div class="container">
            <div class="tittle">
                <h2  style={{ color: '#cc9240' }}>Our Testimonials</h2>
                <div>
                    <p>Lorem ipsum dolor sit amet consectetur. Tempus tincidunt etiam eget elit id imperdiet et. Cras eu
                        sit
                        dignissim lorem nibh et. Ac cum eget habitasse in velit fringilla feugiat senectus in.</p>

                    <button>View All</button>
                </div>
                    </div>
                    <div class="cards">
                        <div class="card">
                            <p>My experience with the book borrowing system has been fantastic! I can now browse a wide range of books from the comfort of my home without having to go to the library. The customer support was very helpful, 
                              and I received quick responses to my inquiries. I highly recommend trying it!</p>
                            <div class="heading">
                                <div class="person">
                                    <img src="/img/testimonial/mohammad.jpg" alt="Sarah"/>
                                    <p>Sarah L</p>
                                </div>
                                <button>Read Full Story</button>
                            </div>
                        </div>
                        <div class="card">
                            <p>I really loved my experience using the book borrowing site! I faced some challenges initially, but the support team was incredibly professional and helped me out quickly. 
                              The ability to rate books makes choosing easier, and I've been borrowing books regularly now!</p>
                            <div class="heading">
                                <div class="person">
                                    <img src="/img/testimonial/jason.png" alt="Jason"/>
                                    <p>Jason M</p>
                                </div>
                                <button>Read Full Story</button>
                            </div>
                        </div>
                        <div class="card">
                            <p>I can't say enough good things about this book borrowing platform! It has made accessing books so convenient and hassle-free. The interface is intuitive, and I appreciate the variety of genres available.  
                              This service has truly enhanced my reading experience</p>
                            <div class="heading">
                                <div class="person">
                                    <img src="/img/testimonial/sam.jpg" alt="Emily"/>
                                    <p>Emily R</p>
                                </div>
                                <button>Read Full Story</button>
                            </div>
                        </div>
                        <div class="card">
                            <p>This system is a true revolution in the library world! The service is excellent, and books are always available. I've borrowed many books and enjoyed every moment. The additional features like a personal reading 
                              list make it easy to keep track of what I’m reading. Thank you for this amazing service!</p>
                            <div class="heading">
                                <div class="person">
                                    <img src="/img/testimonial/michael.png" alt="Michael"/>
                                    <p>Michael K</p>
                                </div>
                                <button>Read Full Story</button>
                            </div>
                        </div>
                    </div>
                </div>
                 </section>
      </div>
    </div>
  );
};

export default HomePage;



















// // HomePage.jsx
// import React, { useEffect, useState } from "react";
// import "./HomePage.css";
// import axios from "axios";
// import { Link } from "react-router-dom";
// import Navbar from "../components/Navbar.jsx";



// const HomePage = () => {
//   const [books, setBooks] = useState([]); // State for all books
//   const [searchTerm, setSearchTerm] = useState(""); // Search term state
//   const [filteredBooks, setFilteredBooks] = useState([]); // Filtered books state

//   // Function to fetch books
//   const fetchBooks = async () => {
//     const queries = [
//       "Van Gogh",
//       "Detective novels",
//       "فلسطين",
//       "Art HISTORY books",
//       "Self development",
//       "تنمية بشرية",
//       "كتب دينية إسلامية",
//       "أدب مقاوم",
//       "technology",
//       "AI",
//       "science"
//     ];

//     const bookPromises = queries.map(query =>
//       axios.get(`https://www.googleapis.com/books/v1/volumes?q=${query}&maxResults=40`)
//     );

//     try {
//       const responses = await Promise.all(bookPromises);
//       const allBooks = [];

//       responses.forEach(response => {
//         if (response.data.items) {
//           const fetchedBooks = response.data.items.map(item => ({
//             id: item.id,
//             title: item.volumeInfo.title,
//             author: item.volumeInfo.authors ? item.volumeInfo.authors.join(', ') : 'Unknown Author',
//             coverUrl: item.volumeInfo.imageLinks ? item.volumeInfo.imageLinks.thumbnail : null // Use null if there is no image
//           }));

//           allBooks.push(...fetchedBooks); // Add fetched books to one array
//         }
//       });

//       // Filter books to ensure titles have four words or less and have a cover image
//       const filteredBooks = allBooks.filter(book => {
//         const titleWords = book.title.split(' ');
//         return titleWords.length <= 4 && book.coverUrl; // Condition for title with four words or less and cover image
//       });

//       setBooks(filteredBooks); // Set the filtered books
//       setFilteredBooks(filteredBooks); // Set the filtered books for display
//     } catch (error) {
//       console.error("Error fetching books:", error);
//     }
//   };

//   // Fetch all books on component mount
//   useEffect(() => {
//     fetchBooks();
//   }, []);

//   // Filter books based on the search term
//   useEffect(() => {
//     if (searchTerm) {
//       const filtered = books.filter(book => 
//         book.title.toLowerCase().includes(searchTerm.toLowerCase())
//       );
//       setFilteredBooks(filtered); // Update filtered books state
//     } else {
//       setFilteredBooks(books); // If no search term, show all books
//     }
//   }, [searchTerm, books]); // Depend on books to ensure filtering works after fetching
//   const userInfo ="student"
//   return (
//     <div>
//       {/* <Navbar userType={userInfo} /> */}
    
//     <div className="main-container">
      
//       <div className="content">
//         <div className="search-bar">
//           <input
//             type="text"
//             placeholder="Enter Book Name..."
//             value={searchTerm}
//             onChange={(e) => setSearchTerm(e.target.value)}
//           />
//         </div>
//         <h1>Books Collection</h1>
//         <div className="book-grid">
//           {filteredBooks.map(book => (
//             <div key={book.id} className="book-card">
//               <Link to={`/book/${book.id}`}>
//                 <img src={book.coverUrl} alt={book.title} className="book-cover" />
//                 <h3>{book.title}</h3>
//                 <p>{book.author}</p>
//               </Link>
//             </div>
//           ))}
//         </div>
//       </div>
//     </div>
//     </div>
//   );
// };

// export default HomePage;



















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