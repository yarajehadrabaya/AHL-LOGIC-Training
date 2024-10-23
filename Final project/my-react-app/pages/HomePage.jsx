
import React, { useEffect, useState } from "react";
import "./HomePage.css";
import { Link, useNavigate } from "react-router-dom";

// leaflet react library for using map on my projcet
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import L from 'leaflet';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faMapMarkerAlt } from '@fortawesome/free-solid-svg-icons';

// Font Awesome : for map section icons
const icon = L.divIcon({
    className: 'custom-icon', // يمكنك إضافة أنماط خاصة هنا
    html: `<div style="color: red; font-size: 24px;"><i class="fas fa-map-marker-alt"></i></div>`, // أيقونة فونت أوسوم
    iconSize: [25, 41], // حجم الأيقونة
    iconAnchor: [12, 41], // نقطة الإرساء للأيقونة
    popupAnchor: [1, -34], // نقطة الإرساء لنافذة المنبثقة
});

const HomePage = () => {
  // Coordinates for Jenin for map section
   const position = [32.4500, 35.2833]; // إحداثيات مدينة جنين
  //  base url for library system api
  const BASE_URL = 'https://ahllibrary.azurewebsites.net';

  const [books, setBooks] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [filteredBooks, setFilteredBooks] = useState([]);
  const [isNavbarOpen, setNavbarOpen] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const navigate = useNavigate();


 // for counter section
  const [totalPages, setTotalPages] = useState(0);
  const [chapters, setChapters] = useState(0);
  const [activeReaders, setActiveReaders] = useState(0);
  const [awards, setAwards] = useState(0);

  // Function to start counting up to a final value on counter section
  const startCounting = (setCount, finalValue) => {
    let currentCount = 0;
    const increment = Math.ceil(finalValue / 100);
    const interval = setInterval(() => {
      currentCount += increment;
      if (currentCount >= finalValue) {
        currentCount = finalValue;
        clearInterval(interval);
      }
      setCount(currentCount);
    }, 50);
  };

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

    // Start counting for the statistics on counter section
    startCounting(setTotalPages, 650);
    startCounting(setChapters, 422);
    startCounting(setActiveReaders, 1055);
    startCounting(setAwards, 20);

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

  const handleBorrowClick = (bookId) => {
    const token = localStorage.getItem("token");

    if (!token) {
      alert("You must be logged in to borrow a book.");
      navigate("/login");
    } else {
      navigate(`/book/${bookId}`);
    }
  };

  return (
    <div>
  
      
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
        </div>
{/* ---------------------------------------------------------------------------------------------------------------------------------------------------------------- */}
        
          {/*Start Counter Section */}
          <section id="mu-counter">
          <div className="container">
            <div className="row">
              <div className="col-md-12">
                <div className="mu-counter-area">
                  <div className="mu-counter-block">
                    <div className="row">
                      <div className="col-md-3 col-sm-6">
                        <div className="mu-single-counter">
                          <i className="fa-solid fa-file-lines" style={{ color: 'orange' }} aria-hidden="true"></i>
                          <div className="counter-value" data-count="650">{totalPages}</div>
                          <h5 className="mu-counter-name">Total Pages</h5>
                        </div>
                      </div>
                      <div className="col-md-3 col-sm-6">
                        <div className="mu-single-counter">
                          <i className="fa-solid fa-book" style={{ color: 'orange' }} aria-hidden="true"></i>
                          <div className="counter-value" data-count="422">{chapters}</div>
                          <h5 className="mu-counter-name">Books</h5>
                        </div>
                      </div>
                      <div className="col-md-3 col-sm-6">
                        <div className="mu-single-counter">
                          <i className="fa-solid fa-book-open-reader "  style={{ color: 'orange' }} aria-hidden="true"></i>
                          <div className="counter-value" data-count="1055">{activeReaders}</div>
                          <h5 className="mu-counter-name">Active Readers</h5>
                        </div>
                      </div>
                      <div className="col-md-3 col-sm-6">
                        <div className="mu-single-counter">
                          <i className="fa fa-trophy"  style={{ color: 'orange' }} aria-hidden="true"></i>
                          <div className="counter-value" data-count="03">{awards}</div>
                          <h5 className="mu-counter-name">Awards</h5>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
  {/* END counter section */}


{/* ---------------------------------------------------------------------------------------------------------------------------------------------------------------- */}
    {/* Start Book Categories section */}

        {/* Book Categories Section */}
        <section className="book-categories" id="book-categories">
          <div className="container">
            <div className="title">
            <h2 style={{
              color: 'rgb(0, 0, 0)',
              fontSize: '40px',
              textAlign: 'center',
              position: 'relative',
              display: 'inline-block',
              marginBottom:"40px"
            }}>
              Books Categories
              <span style={{content: '""',position: 'absolute',left: '50%', transform: 'translateX(-50%)', bottom: '-10px',
                width: '90%',
                height: '6px',    
                backgroundColor: 'orange',
                borderRadius: '5px', 
              }}></span>
            </h2>
              
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
                <h3>Psychology and self-development</h3>
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
       {/* END Book Categories section */}


{/* ---------------------------------------------------------------------------------------------------------------------------------------------------------------- */}
       
        {/*start Our Books Section */}
        <section className="our-books" id="books">
          <div className="container">
            <div className="title">
            <h2 style={{ color: 'rgb(0, 0, 0)',fontSize: '40px',textAlign: 'center', position: 'relative', display: 'inline-block'}}>
              Our BOOKS
              <span style={{content: '""',position: 'absolute',left: '50%', transform: 'translateX(-50%)',bottom: '-10px',
                width: '80%',       // التحكم بطول الخط السفلي
                height: '6px',      // التحكم بسمك الخط 
                backgroundColor: 'orange',
                borderRadius: '5px' // تدوير حواف الخط
              }}></span>
            </h2>
             
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
                          e.target.onerror = null;
                          e.target.src = "/img/default-book.png";
                        }}
                      />
                      <p className="author">{book.author}</p>
                      <h3>{book.title}</h3>
                    </Link>
                    <button onClick={() => handleBorrowClick(book.id)}>Borrow</button>
                  </div>
                ))
              ) : (
                <p>{errorMessage}</p>
              )}
            </div>
          </div>
        </section>
      {/* END  Our Books section */}

        
 {/* ---------------------------------------------------------------------------------------------------------------------------------------------------------------- */}       
        {/* Start testimonials section */}
        <section class="Our-testimonials" id="testimonial">
        <div class="container">
            <div class="tittle">
            <h2 style={{ color: 'rgb(0, 0, 0)',fontSize: '40px',textAlign: 'center', position: 'relative',display: 'inline-block'}}>
              Our Testimonials
              <span style={{ content: '""', position: 'absolute', left: '50%',transform: 'translateX(-50%)', bottom: '-10px',
                width: '20%',       //التحكم بطول الخط السفلي
                height: '6px',      // زيادة السمك
                backgroundColor: 'orange',
                borderRadius: '5px' // تدوير حواف الخط
              }}></span>
            </h2>
          </div>
                    <div class="cards">
                        <div class="card">
                            <p>My experience with the book borrowing system has been fantastic! I can now browse a wide range of books from the comfort of my home without having to go to the library. The customer support was very helpful, 
                              and I received quick responses to my inquiries. I highly recommend trying it!</p>
                            <div class="heading">
                                <div class="person">
                                    <img src="/img/testimonial/mohammad.jpg" alt="mohammad"/>
                                    <p>Mohammad D</p>
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
                                    <img src="/img/testimonial/sam.jpg" alt="sam"/>
                                    <p>Sam R</p>
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
        {/* END testimonials section */}

 {/* ---------------------------------------------------------------------------------------------------------------------------------------------------------------- */}
             
         {/* Start map section */}
          <MapContainer center={position} zoom={10} scrollWheelZoom={false} touchZoom={false} style={{ height: '100vh', width: '100%' }}> {/* قم بتعديل قيمة الزوم هنا */}
            <TileLayer
                url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
            />
            <Marker position={position} icon={icon}>
                <Popup>
                    This is the city of Jenin!
                </Popup>
            </Marker>
        </MapContainer>
       {/* END map section */}

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
