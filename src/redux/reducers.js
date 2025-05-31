import {
  FETCH_BOOKS_START,
  FETCH_BOOKS_SUCCESS,
  FETCH_BOOKS_ERROR,
  SET_SORTING,
} from './actions';

const initialState = {
  books: [],
  loading: false,
  error: null,
  sortBy: 'title',
  order: 'asc',
};

const booksReducer = (state = initialState, action) => {
  switch (action.type) {
    case FETCH_BOOKS_START:
      return { ...state, loading: true };
    case FETCH_BOOKS_SUCCESS:
      return { ...state, loading: false, books: action.payload };
    case FETCH_BOOKS_ERROR:
      return { ...state, loading: false, error: action.payload };
    case SET_SORTING:
      return { ...state, sortBy: action.payload.field, order: action.payload.order };
    default:
      return state;
  }
};

export default booksReducer;
