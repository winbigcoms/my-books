// @flow
import React, { useCallback } from 'react';
import { BookList } from '../components/BookList';
import { useDispatch, useSelector } from 'react-redux';
import { getBooksThunk } from '../action';

export function BookListContainer() {
  const dispatch = useDispatch();

  const books = useSelector(state => state.books.books);
  const loading = useSelector(state => state.books.loading);
  const error = useSelector(state => state.books.error);
  const getBooks = useCallback(()=>{
    dispatch(getBooksThunk());
  },[dispatch]);
  return (
      <BookList 
        books={books}
        loading={loading} 
        error={error} 
        getBooks={getBooks}
      />
  );
};