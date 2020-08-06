// @flow
import React, { useCallback } from 'react';
import SinginForm from '../components/SinginForm';
import { useDispatch } from 'react-redux';
import { loginThunk } from '../action';
import { useHistory } from 'react-router-dom';
export function SigninContainer() {
  const dispathch = useDispatch();
  const history = useHistory()

  const login = useCallback((email,password)=>{
    dispathch(loginThunk(email,password,history));
  },[dispathch, history])
  
  return (
    <SinginForm login={login}/>
  );
};