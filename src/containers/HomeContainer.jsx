// @flow
import React, { useCallback } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { HomeComponent } from '../components/HomeComponent';
import { startGetBookActionCreator } from '../redux/modules/books';
import { startDeleteBookActionCreator } from '../redux/modules/books';
import { startLogoutSagaActionCreator } from '../redux/modules/auth';

export function HomeContainer() {
  const dispatch = useDispatch();

  const books = useSelector(state => state.books.books);
  const loading = useSelector(state => state.books.loading);
  const error = useSelector(state => state.books.error);
  const token = useSelector(state => state.auth.token);
  
  const getBooks = useCallback(()=>{
    dispatch((startGetBookActionCreator()));
  },[dispatch]);
  
  const logout = useCallback(()=>{
    dispatch((startLogoutSagaActionCreator(token)));
  },[dispatch,token]);

  const deleteBook = useCallback((bookId)=>{
    dispatch(startDeleteBookActionCreator(bookId))
  },[dispatch]);
  
  return (
      <HomeComponent
        books={books}
        loading={loading} 
        error={error} 
        getBooks={getBooks}
        logout={logout}
        deleteBook={deleteBook}
      />
  );
};