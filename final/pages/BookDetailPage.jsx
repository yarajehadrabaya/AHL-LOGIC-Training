// BookDetailPage.jsx

import React, { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import axios from "axios";
import "./BookDetailPage.css"; // Ensure you have a CSS file for styling the page
import Navbar from "../components/Navbar.jsx";




const BookDetailPage = () => {
    const { id } = useParams();
    const [book, setBook] = useState(null);

    const fetchBookDetails = async () => {
        try {
            const response = await axios.get(`https://www.googleapis.com/books/v1/volumes/${id}`);
            setBook(response.data);
        } catch (error) {
            console.error("Error fetching book details:", error);
        }
    };

    useEffect(() => {
        fetchBookDetails();
    }, [id]);

    if (!book) {
        return <p>Loading...</p>;
    }

    return (
        <div className="main-container">
            <Navbar /> 
            <div className="content">
                <h1>{book.volumeInfo.title}</h1>
                <img src={book.volumeInfo.imageLinks?.thumbnail} alt={book.volumeInfo.title} className="book-cover" />
                <h3>Author: {book.volumeInfo.authors ? book.volumeInfo.authors.join(', ') : 'Unknown Author'}</h3>
                <p>{book.volumeInfo.description || 'No description available.'}</p>
                <button className="borrow-button">استعارة الكتاب</button>
            </div>
        </div>
    );
};

export default BookDetailPage;
