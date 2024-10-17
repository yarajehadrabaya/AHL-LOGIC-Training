import React, { useEffect, useState } from "react";
import "./HomePage.css";
import axios from "axios";
import { Link } from "react-router-dom";
import Navbar from "../components/Navbar.jsx";

const HomePage = () => {
  const [books, setBooks] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [filteredBooks, setFilteredBooks] = useState([]);
  const [isNavbarOpen, setNavbarOpen] = useState(false);
  const [errorMessage, setErrorMessage] = useState(""); // State for error message

  const fetchBooks = async () => {
    const queries = [
     "Detective novels", "فلسطين", "Art HISTORY books", "Self development", 
      "تنمية بشرية", "كتب دينية إسلامية", "أدب مقاوم", "technology", "AI", "science"
    ];

    const bookPromises = queries.map(query =>
      axios.get(`https://www.googleapis.com/books/v1/volumes?q=${query}&maxResults=20`)
    );

    try {
      const responses = await Promise.all(bookPromises);
      const allBooks = responses.flatMap(response =>
        response.data.items?.map(item => ({
          id: item.id,
          title: item.volumeInfo.title,
          author: item.volumeInfo.authors ? item.volumeInfo.authors.join(', ') : 'Unknown Author',
          coverUrl: item.volumeInfo.imageLinks?.thumbnail || null
        })) || []
      );

      const filteredBooks = allBooks.filter(book => {
        const titleWords = book.title.split(' ');
        return titleWords.length <= 4 && book.coverUrl;
      });

      setBooks(filteredBooks);
      setFilteredBooks(filteredBooks);
    } catch (error) {
      console.error("Error fetching books:", error);
    }
  };

  useEffect(() => {
    fetchBooks();
  }, []);

  useEffect(() => {
    if (searchTerm) {
      const filtered = books.filter(book => 
        book.title.toLowerCase().includes(searchTerm.toLowerCase())
      );
      setFilteredBooks(filtered);

      // Set error message if no books are found
      if (filtered.length === 0) {
        setErrorMessage("No books found matching your search.");
      } else {
        setErrorMessage(""); // Clear error message if books are found
      }
    } else {
      setFilteredBooks(books);
      setErrorMessage(""); // Clear error message if search term is empty
    }
  }, [searchTerm, books]);

  const toggleNavbar = () => {
    setNavbarOpen(!isNavbarOpen);
  };

  const handleKeyPress = (event) => {
    if (event.key === 'Enter') {
      // Navigate to the "Our BOOKS" section
      document.getElementById("books").scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <div>
      {/* <Navbar userType="student" toggleNavbar={toggleNavbar} isOpen={isNavbarOpen} /> */}
      {/* <div className={`overlay ${isNavbarOpen ? 'active' : ''}`} onClick={toggleNavbar}></div> */}
      
      <div className="main-container">
        <div className="search-section" style={{ backgroundImage: 'url("/img/poster.png")' }}>
          <div className="logo">
            <img src="/img/logo.png" alt="Site Logo" />
          </div>
          <h2 className="text1">Unlock the magic of reading..</h2>
          <p className="text">explore our diverse collection of books!</p>
          <div className="search-bar">
            <input
              type="text"
              placeholder="Enter Book Name..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              onKeyPress={handleKeyPress}
            />
          <i className="search-icon fas fa-search"></i> {/* Search icon */}
          </div>

          {errorMessage && <p className="error-message">{errorMessage}</p>} {/* Display error message */}
        </div>

        <section className="book-categories" id="book-categories">
          <div className="container">
            <div className="title">
              <h2>Book Categories</h2>
              <p>Lorem ipsum dolor sit amet consectetur. Tempus tincidunt etiam eget elit id imperdiet et...</p>
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
      <h2>Our BOOKS</h2>
    </div>

    <div className="books">
      {filteredBooks.length > 0 ? ( // تحقق مما إذا كانت هناك كتب متطابقة
        filteredBooks.map(book => (
          <div key={book.id} className="course">
            <Link to={`/book/${book.id}`}>
              <img src={book.coverUrl} alt={book.title} />
              <p className="aouther">{book.author}</p>
              <h3>{book.title}</h3>
            </Link>
            <Link to={`/book/${book.id}`}>
              <button>Borrow it</button>
            </Link>
          </div>
        ))
      ) : (
        
        <div className="error-container"> {/* إضافة عنصر لتغليف رسالة الخطأ */}
        
          <p className="error-message">{errorMessage}</p> {/* عرض رسالة الخطأ */}
        </div>
      )}
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