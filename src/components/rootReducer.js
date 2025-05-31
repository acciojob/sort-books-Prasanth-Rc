// src/reducers/rootReducer.js
import { combineReducers } from 'redux';
import BookReducer from './BookReducer';

export default combineReducers({
  books: BookReducer
});