// src/components/BooksList.js
import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import { fetchBooks, sortBooks } from './bookActions';

const BookList = ({ books, loading, error, sortBy, sortOrder, fetchBooks, sortBooks }) => {
  useEffect(() => {
    fetchBooks();
  }, [fetchBooks]);

  const handleSortChange = (e) => {
    const { name, value } = e.target;
    if (name === 'sortBy') {
      sortBooks(value, sortOrder);
    } else if (name === 'sortOrder') {
      sortBooks(sortBy, value);
    }
  };

  const sortedBooks = [...books].sort((a, b) => {
    const aValue = a[sortBy] || '';
    const bValue = b[sortBy] || '';
    
    if (aValue < bValue) {
      return sortOrder === 'asc' ? -1 : 1;
    }
    if (aValue > bValue) {
      return sortOrder === 'asc' ? 1 : -1;
    }
    return 0;
  });

  if (loading) return <div>Loading books...</div>;
  if (error) return <div>Error: {error}</div>;

  return (
    <div>
      <div className="sort-controls">
        <select name="sortBy" value={sortBy} onChange={handleSortChange}>
          <option value="title">Title</option>
          <option value="author">Author</option>
          <option value="publisher">Publisher</option>
        </select>
        
        <select name="sortOrder" value={sortOrder} onChange={handleSortChange}>
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

const mapStateToProps = (state) => ({
  books: state.books.books,
  loading: state.books.loading,
  error: state.books.error,
  sortBy: state.books.sortBy,
  sortOrder: state.books.sortOrder
});

export default connect(mapStateToProps, { fetchBooks, sortBooks })(BookList);