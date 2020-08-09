// @flow
import React, { useCallback } from 'react';
import { AddBookComponent } from '../components/AddBookComponent';
import { useDispatch } from 'react-redux';
import { startPostBookActionCreator } from '../redux/modules/books';

export function AddBookContainer() {
  
  const dispatch = useDispatch();
  
  const post = useCallback((bookInfo)=>{
    dispatch(startPostBookActionCreator(bookInfo));
  },[dispatch]);

  return (
    <AddBookComponent post={post}/>
  );
};