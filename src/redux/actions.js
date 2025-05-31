import axios from 'axios';

export const FETCH_BOOKS_START = 'FETCH_BOOKS_START';
export const FETCH_BOOKS_SUCCESS = 'FETCH_BOOKS_SUCCESS';
export const FETCH_BOOKS_ERROR = 'FETCH_BOOKS_ERROR';
export const SET_SORTING = 'SET_SORTING';

export const fetchBooks = () => async (dispatch) => {
  dispatch({ type: FETCH_BOOKS_START });
  try {
    const response = await axios.get('https://api.nytimes.com/svc/books/v3/lists/current/hardcover-fiction.json?api-key=YOUR_API_KEY');
    dispatch({ type: FETCH_BOOKS_SUCCESS, payload: response.data.results.books });
  } catch (error) {
    dispatch({ type: FETCH_BOOKS_ERROR, payload: error.message });
  }
};

export const setSorting = (field, order) => ({
  type: SET_SORTING,
  payload: { field, order },
});
