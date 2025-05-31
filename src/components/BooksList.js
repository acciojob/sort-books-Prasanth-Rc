import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchBooks, setSorting } from '../redux/actions';

const BooksList = () => {
  const dispatch = useDispatch();
  const { books, loading, error, sortBy, order } = useSelector((state) => state.books);

  useEffect(() => {
    dispatch(fetchBooks());
  }, [dispatch]);

  const sortedBooks = [...books].sort((a, b) => {
    const fieldA = a[sortBy]?.toLowerCase();
    const fieldB = b[sortBy]?.toLowerCase();
    if (fieldA < fieldB) return order === 'asc' ? -1 : 1;
    if (fieldA > fieldB) return order === 'asc' ? 1 : -1;
    return 0;
  });

  const handleSortChange = (e) => {
    dispatch(setSorting(e.target.name, e.target.value));
  };

  return (
    <div>
      <h2>Book Sorting App</h2>
      <div>
        <label>Sort By: </label>
        <select name="field" onChange={(e) => handleSortChange({ target: { name: 'sortBy', value: e.target.value } })}>
          <option value="title">Title</option>
          <option value="author">Author</option>
          <option value="publisher">Publisher</option>
        </select>

        <label>Order: </label>
        <select name="order" onChange={handleSortChange}>
          <option value="asc">Ascending</option>
          <option value="desc">Descending</option>
        </select>
      </div>

      {loading ? (
        <p>Loading...</p>
      ) : error ? (
        <p>Error: {error}</p>
      ) : (
        <table border="1">
          <thead>
            <tr>
              <th>Title</th>
              <th>Author</th>
              <th>Publisher</th>
              <th>ISBN</th>
            </tr>
          </thead>
          <tbody>
            {sortedBooks.map((book) => (
              <tr key={book.primary_isbn13}>
                <td>{book.title}</td>
                <td>{book.author}</td>
                <td>{book.publisher}</td>
                <td>{book.primary_isbn13}</td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
};

export default BooksList;
