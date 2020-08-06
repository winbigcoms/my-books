// @flow
import React, { useState } from 'react';
import styles from "../styles/Signin.module.scss";
import {Button } from 'antd';

export default function SinginForm(props) {
  const passwordRef = React.createRef(null);
  const signinBtn = React.createRef(null);
  const emailRef = React.createRef(null);
  const checkEmail = React.createRef(null);
  const checkPassword = React.createRef(null);
  const [state,setState] = useState({btnOn:false});


  function click() {
    const email = emailRef.current.value;
    const password = passwordRef.current.value;
    if(email === "" || password ==="") return; 
    props.login(email,password);
  }
  
  function change ({target}) {
    const emailRegExp = /^[0-9a-zA-Z]([-_.]?[0-9a-zA-Z])*@[0-9a-zA-Z]([-_.]?[0-9a-zA-Z])*.[a-zA-Z]{2,3}$/i;
    if(target.name === "email") {
      this.setState((state) => {
        return {email:target.value}
      });
      if(emailRegExp.test(target.value)){
        checkEmail.current.innerText = "O";
      }else if(target.value.trim()===""){
        checkEmail.current.innerText = "";
      }else{
        checkEmail.current.innerText = "X";
      }
    }

    if(target.name ==="password") {
      target.value.trim() ==="" ? checkPassword.current.innerText = ``: checkPassword.current.innerText = "O";
    }
    if(passwordRef.current.value.length && emailRegExp.test(emailRef.current.value) ){
      setState(state =>({btnOn:false}));
    }else{
      setState(state =>({btnOn:true}));
    }
  }
  return (
    <div>
      <div className={styles.signinForm}>
            <h1 className={styles.signinTitle}>
              <p>쉬다가요</p>
              나의 작은 도서관
            </h1>
            <p className={styles.inputBox}>
              <input type="text" placeholder="이메일"name="email" ref={emailRef} onChange={change} />
              <span className={styles.checkEmail} ref={checkEmail}></span>
            </p>
            <p className={styles.inputBox}>
              <input type="password" placeholder="비밀번호" name="password" ref={passwordRef} onChange={change} />
              <span className={styles.checkPassword} ref={checkPassword}></span>
            </p>
            <Button type="primary" onClick={click} className={styles.signinBtn} ref={signinBtn} disabled={state.btnOn}>입장하기</Button>
          </div>
    </div>
  );
};