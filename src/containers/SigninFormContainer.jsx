// @flow
import React, { useCallback } from 'react';
import SinginForm from '../components/SinginForm';
import { useDispatch } from 'react-redux';
import { useHistory } from 'react-router-dom';
import { startLoginSagaActionCreator } from '../redux/modules/auth';
export function SigninContainer() {
  const dispathch = useDispatch();
  const history = useHistory()

  const login = useCallback((email,password)=>{
    dispathch(startLoginSagaActionCreator(email,password,history));
  },[dispathch, history])
  
  return (
    <SinginForm login={login}/>
  );
};