// src/reducers/bookReducer.js
import {
  FETCH_BOOKS_REQUEST,
  FETCH_BOOKS_SUCCESS,
  FETCH_BOOKS_FAILURE,
  SORT_BOOKS
} from './bookActions';

const initialState = {
  loading: false,
  books: [],
  error: '',
  sortBy: 'title',
  sortOrder: 'asc'
};

export default function bookReducer(state = initialState, action) {
  switch (action.type) {
    case FETCH_BOOKS_REQUEST:
      return { ...state, loading: true };
    case FETCH_BOOKS_SUCCESS:
      return { ...state, loading: false, books: action.payload, error: '' };
    case FETCH_BOOKS_FAILURE:
      return { ...state, loading: false, books: [], error: action.payload };
    case SORT_BOOKS:
      return { ...state, sortBy: action.sortBy, sortOrder: action.sortOrder };
    default:
      return state;
  }
}