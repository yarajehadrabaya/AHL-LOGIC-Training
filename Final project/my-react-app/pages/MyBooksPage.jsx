import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './MyBooksPage.css';

const MyBookPage = () => {
    const BASE_URL = 'http://ahllibrary.azurewebsites.net'; // Define base URL here

    const [borrowedBooks, setBorrowedBooks] = useState([]);
    const [isReturnModalOpen, setIsReturnModalOpen] = useState(false); // Modal state
    const [selectedBookId, setSelectedBookId] = useState(null); // Track the selected book for return

    useEffect(() => {
        const fetchBorrowedBooks = async () => {
            const currentUserId = localStorage.getItem("userId");
            console.log("User ID from localStorage:", currentUserId);

            if (currentUserId) {
                try {
                    const response = await axios.get('https://ahllibrary.azurewebsites.net/api/Book/GetBooks');
                    const data = response.data;

                    console.log("All books data:", data);

                    const borrowedBook = data.filter(book => String(book.userId) === String(currentUserId));

                    console.log("Filtered borrowed books:", borrowedBook);
                    setBorrowedBooks(borrowedBook);
                } catch (error) {
                    console.log("Error fetching books:", error);
                }
            } else {
                console.log("No user ID found in localStorage.");
            }
        };

        fetchBorrowedBooks();
    }, []);

    // Function to return the book
    const returnBook = (bookId) => {
        setSelectedBookId(bookId); // Set the book for return
        setIsReturnModalOpen(true); // Open the modal
    };

    // Function to confirm the book return
    const confirmReturnBook = async () => {
        const token = localStorage.getItem("token"); // Assuming you store the token in localStorage
    
        try {
            const response = await axios.get(`https://ahllibrary.azurewebsites.net/api/Book/ReturnBook/${selectedBookId}`, {
                headers: {
                    Authorization: `Bearer ${token}` // Add token in headers
                }
            });
    
            // Update the list of books after return
            setBorrowedBooks(borrowedBooks.filter(book => book.id !== selectedBookId));
            alert("Book returned successfully!"); // Success message
            setIsReturnModalOpen(false); // Close the modal
        } catch (error) {
            console.log("Error returning the book:", error);
            alert("Error returning the book. Please try again."); // Error message
        }
    };

    return (
        <div>
            <section className="borrowed-books" id="books">
                <div className="container">
                    <div className="title">
  
  
                        <h2 id='hh2'>Borrowed Books:</h2>
                    </div>
                    {borrowedBooks.length === 0 ? ( // Check if the array is empty
                        <p className="error-message">No borrowed books available.</p> // Message when no borrowed books exist
                    ) : (
                        <div className="books">
                            {borrowedBooks.map((book) => (
                                <div key={book.id} className="course">
                                    <img 
                                        src={book.photoPath ? `${BASE_URL}/${book.photoPath}` : "/img/default-book.png"} 
                                        alt={book.title} 
                                    />
                                    <p className="author">{book.author}</p>
                                    <h3>{book.title}</h3>
                                    <button onClick={() => returnBook(book.id)}>Return it</button>
                                </div>
                            ))}
                        </div>
                    )}
                </div>
            </section>

            {/* Return confirmation modal */}
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

export default MyBookPage;
