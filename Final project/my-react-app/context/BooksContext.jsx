import React, { createContext, useState, useEffect } from "react";

export const BooksContext = createContext();

export const BooksProvider = ({ children }) => {
  const [books, setBooks] = useState([]);
  const [errorMessage, setErrorMessage] = useState("");
  const BASE_URL = 'https://libraryforstd-d5epbbadfwc3hygk.eastasia-01.azurewebsites.net';

  useEffect(() => {
    const fetchBooks = async () => {
      try {
        const response = await fetch(`${BASE_URL}/api/Book/GetBooks`);
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        const data = await response.json();
        setBooks(data);
      } catch (error) {
        setErrorMessage("حدث خطأ أثناء جلب البيانات: " + error.message);
      }
    };

    fetchBooks();
  }, []);

  return (
    <BooksContext.Provider value={{ books, setBooks, errorMessage }}>
      {children}
    </BooksContext.Provider>
  );
};
