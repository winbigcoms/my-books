// @flow
import React, { useCallback } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getBooksThunk } from '../action';
import { HomeComponent } from '../components/HomeComponent';

export function HomeContainer() {
  const dispatch = useDispatch();

  const books = useSelector(state => state.books.books);
  const loading = useSelector(state => state.books.loading);
  const error = useSelector(state => state.books.error);
  const getBooks = useCallback(()=>{
    dispatch(getBooksThunk());
  },[dispatch]);
  return (
      <HomeComponent
        books={books}
        loading={loading} 
        error={error} 
        getBooks={getBooks}
      />
  );
};