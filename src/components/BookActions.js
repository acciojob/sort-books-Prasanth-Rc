// src/actions/bookActions.js
import axios from 'axios';

export const FETCH_BOOKS_REQUEST = 'FETCH_BOOKS_REQUEST';
export const FETCH_BOOKS_SUCCESS = 'FETCH_BOOKS_SUCCESS';
export const FETCH_BOOKS_FAILURE = 'FETCH_BOOKS_FAILURE';
export const SORT_BOOKS = 'SORT_BOOKS';

const NYT_API_KEY = 'YOUR_NYT_API_KEY'; // Replace with your actual API key

export const fetchBooks = () => {
  return (dispatch) => {
    dispatch({ type: FETCH_BOOKS_REQUEST });
    axios.get(`https://api.nytimes.com/svc/books/v3/lists/current/hardcover-fiction.json?api-key=${NYT_API_KEY}`)
      .then(response => {
        const books = response.data.results.books.map(book => ({
          title: book.title,
          author: book.author,
          publisher: book.publisher,
          isbn: book.primary_isbn13
        }));
        dispatch({ type: FETCH_BOOKS_SUCCESS, payload: books });
      })
      .catch(error => {
        dispatch({ type: FETCH_BOOKS_FAILURE, payload: error.message });
      });
  };
};

export const sortBooks = (sortBy, sortOrder) => ({
  type: SORT_BOOKS,
  sortBy,
  sortOrder
});