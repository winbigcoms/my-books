import React from 'react';
import ReactDOM from 'react-dom';
import 'antd/dist/antd.css';
import './index.css';
import App from './App';

//상태변경을알려주는 함수


import {Provider}from "react-redux"
import Store from './store';
const store = Store()

ReactDOM.render(
  <Provider store={store}>
    <App />
  </Provider>
,document.getElementById('root'));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA