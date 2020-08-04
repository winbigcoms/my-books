// @flow
import * as React from 'react';
import { Redirect } from 'react-router-dom';
export function withAuth(Component, hasToken) {
  const displayName = `withAuth${Component.displayName}`;

  const C = (props) => {
    const token = localStorage.getItem("token");
    if(token !== null && !hasToken) {
      return <Redirect to="/"/>
    }
    if(token === null && hasToken) {
      return <Redirect to="/signin"/>
    }
    return (<Component {...props}/>)
  }

  C.displayName = displayName;
  
  return C;
};