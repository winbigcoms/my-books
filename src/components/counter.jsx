// @flow
import React, { useState, useEffect, useContext } from 'react';
import useWindowWidth from '../hooks/useWindowWidth';
import PersonContext from '../Context/PersonContext';

export default function Counter(props) {
  
  const [state,setState] = useState({count:0});
  const width = useWindowWidth();
  function click(){
    setState({count:state.count+1});
  }
  const context = useContext(PersonContext);
  return (
    <div>
      <p>지금 너비는 {width}</p>
      <button onClick={click}>+</button>
      <h1>{state.count}</h1>
      {JSON.stringify(context)}
    </div>
  );
};