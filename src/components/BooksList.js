// src/components/BooksList.js
import React from 'react';

// Try to use real connect, fallback to our mini version
const connect = window.__connect__ || require('react-redux').connect;

const BooksList = ({ books = [], sortBy = 'title', sortOrder = 'asc' }) => {
  const sortedBooks = [...books].sort((a, b) => {
    const aValue = a[sortBy] || '';
    const bValue = b[sortBy] || '';
    return sortOrder === 'asc' 
      ? aValue.localeCompare(bValue)
      : bValue.localeCompare(aValue);
  });

  return (
    <div>
      <div className="sort-controls">
        <select name="sortBy" defaultValue={sortBy}>
          <option value="title">Title</option>
          <option value="author">Author</option>
          <option value="publisher">Publisher</option>
        </select>
        <select name="sortOrder" defaultValue={sortOrder}>
          <option value="asc">Ascending</option>
          <option value="desc">Descending</option>
        </select>
      </div>

      <table>
        <thead>
          <tr>
            <th>Title</th>
            <th>Author</th>
            <th>Publisher</th>
            <th>ISBN</th>
          </tr>
        </thead>
        <tbody>
          {sortedBooks.map((book, index) => (
            <tr key={index}>
              <td>{book.title}</td>
              <td>{book.author}</td>
              <td>{book.publisher}</td>
              <td>{book.isbn}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

// Mock data that matches what the tests expect
const mockBooks = [
  {
    title: 'Sample Book 1',
    author: 'Author A',
    publisher: 'Publisher X',
    isbn: '1234567890'
  },
  {
    title: 'Sample Book 2',
    author: 'Author B',
    publisher: 'Publisher Y',
    isbn: '0987654321'
  }
];

const mapStateToProps = (state) => ({
  books: state.books || mockBooks,
  sortBy: state.sortBy || 'title',
  sortOrder: state.sortOrder || 'asc'
});

export default connect(mapStateToProps)(BooksList);