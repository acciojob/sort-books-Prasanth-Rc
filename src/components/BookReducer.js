// src/reducers/bookReducer.js
const initialState = {
  books: [],
  sortBy: 'title',
  sortOrder: 'asc'
};

export default function bookReducer(state = initialState, action) {
  switch (action.type) {
    case 'FETCH_BOOKS_SUCCESS':
      return { ...state, books: action.payload };
    case 'SORT_BOOKS':
      return { 
        ...state, 
        sortBy: action.sortBy,
        sortOrder: action.sortOrder
      };
    default:
      return state;
  }
}