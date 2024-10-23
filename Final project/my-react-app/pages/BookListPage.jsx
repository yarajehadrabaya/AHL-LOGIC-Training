import React, { useState, useEffect } from 'react';
import './BookListPage.css';

function BookListPage() {
  const [books, setBooks] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [editBookId, setEditBookId] = useState(null);
  const [formData, setFormData] = useState({ title: '', author: '', price: '' });

  const token = localStorage.getItem('token');

  useEffect(() => {
    fetchBooks();
  }, []);

  const fetchBooks = async () => {
    const response = await fetch('https://ahllibrary.azurewebsites.net/api/Book/GetBooks', {
      headers: {
        'Authorization': `Bearer ${token}`,
      },
    });
    const data = await response.json();
    console.log('Fetched books:', data);
    setBooks(data);
  };

  

  const handleDelete = async (id) => {
    if (window.confirm('Are you sure you want to delete this book?')) {
      const response = await fetch(`https://ahllibrary.azurewebsites.net/api/Book/DeleteBook/${id}`, {
        method: 'DELETE',
        headers: {
          'Authorization': `Bearer ${token}`,
        },
      });

      if (response.ok) {
        setBooks(books.filter(book => book.id !== id));
        alert('Book deleted successfully.');
      } else {
        alert('Failed to delete the book.');
      }
    }
  };



  const handleEdit = async (id) => {
    if (editBookId === id) {
      if (window.confirm('Are you sure you want to save changes?')) {
        console.log('Editing book with ID:', id, 'Data to send:', formData);
        const response = await fetch(`https://ahllibrary.azurewebsites.net/api/Book/Editbook/${id}`, {
          method: 'PUT',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`,
          },
          body: JSON.stringify(formData),
        });

        if (response.ok) {
          setEditBookId(null);
          fetchBooks();
          alert('Book updated successfully.');
        } else {
          alert('Failed to update the book.');
        }
      }
    } else {
      setEditBookId(id);
      const book = books.find((b) => b.id === id);
      setFormData({ 
        title: book.title || '', 
        author: book.author || '', 
        price: book.price || ''
      });
    }
  };

  const handleAdd = async () => {
    if (!formData.title || !formData.author || !formData.price) {
      alert('Please fill in all fields.');
      return; 
    }
  
    if (window.confirm('Are you sure you want to add this book?')) {
      console.log('Adding new book with data:', formData);
  
      const data = new FormData();
      data.append('title', formData.title);
      data.append('author', formData.author);
      data.append('price', parseFloat(formData.price));
  
      const response = await fetch('https://ahllibrary.azurewebsites.net/api/Book/AddBook', {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${token}`,
        },
        body: data,
      });
  
      if (response.ok) {
        const addedBook = await response.json(); // Assuming the API returns the added book details
        setFormData({ title: '', author: '', price: '' });
        fetchBooks();
        console.log(`Book added successfully!\nTitle: ${addedBook.title}\nAuthor: ${addedBook.author}\nPrice: ${addedBook.price}`);
      } else {
        const errorData = await response.json();
        console.error('Error adding book:', errorData);
        console.log(`Failed to add the book: ${errorData.message || 'Unknown error'}`);
      }
    }
  };
  
  const filteredBooks = books.filter((book) =>
    book.title.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="page-background">
      <div className="book-list-container">
        <h1>Library Book List</h1>

        <div className="search-bar">
          <input
            type="text"
            placeholder="Search for a book..."
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>

        <table className="book-table">
          <thead>
            <tr>
              <th>Title</th>
              <th>Author</th>
              <th>Price</th>
              <th>Image</th>
              <th>Status</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {filteredBooks.map((book) => (
              <tr key={book.id} className="book-row">
                <td>{editBookId === book.id ? <input value={formData.title} onChange={(e) => setFormData({ ...formData, title: e.target.value })} /> : book.title}</td>
                <td>{editBookId === book.id ? <input value={formData.author} onChange={(e) => setFormData({ ...formData, author: e.target.value })} /> : book.author}</td>
                <td>{editBookId === book.id ? <input value={formData.price} onChange={(e) => setFormData({ ...formData, price: e.target.value })} /> : book.price}</td>
                <td>{book.photoPath ? <img src={book.photoPath} alt={book.title} /> : 'No image available'}</td>
                <td>{book.isAvaliable ? 'Available' : 'Borrowed'}</td>
                <td>
                  <button className="edit-button" onClick={() => handleEdit(book.id)}>
                    {editBookId === book.id ? 'Save' : 'Edit'}
                  </button>
                  <button className="delete-button" onClick={() => handleDelete(book.id)}>Delete</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>

        <div className="add-book-form">
          <h2>Add a new book</h2>
          <input
            type="text"
            placeholder="Title"
            value={formData.title}
            onChange={(e) => setFormData({ ...formData, title: e.target.value })}
          />
          <input
            type="text"
            placeholder="Author"
            value={formData.author}
            onChange={(e) => setFormData({ ...formData, author: e.target.value })}
          />
          <input
            type="text"
            placeholder="Price"
            value={formData.price}
            onChange={(e) => setFormData({ ...formData, price: e.target.value })}
          />
          <button className="add-button" onClick={handleAdd}>Add Book</button>
        </div>
      </div>
    </div>
  );
}

export default BookListPage;
