// @flow
import * as React from 'react';
import axios from "axios";
import { message, Row, Col, Button } from 'antd';
import {withAuth} from "../HOCs/withAuth"
import styles from "../styles/Signin.module.scss";
class Signin extends React.Component {
  
  state = {
    email: "",
    btnOn:true
  }
  
  checkEmail = React.createRef(null);
  checkPassword = React.createRef(null);
  passwordRef = React.createRef(null);
  signinBtn = React.createRef(null);
  click =  async() => {
    const email = this.state.email;
    const password = this.passwordRef.current.value;
    if(email === "" || password ==="") return; 
    try{
      const resData = await axios.post("https://api.marktube.tv/v1/me",{email,password});

      console.log("!")
      const token = resData.data.token;
      localStorage.setItem('token',token);
      this.props.history.push("/");

    }catch(e){
      console.log("?")

      const errorCode = e.response.data.error;
      if(errorCode === 'PASSWORD_NOT_MATCH'){
        message.error('몬가..몬가 잘못입력했어')
      }else if (errorCode === 'UESR_NOT_EXIST'){
        message.error('잉? 너 누구야 없는 이메일인데')
      }else {
        message.error('몬가..몬가 잘못댐');
      }
    }
  }
  
  change = ({target}) =>{
    const emailRegExp = /^[0-9a-zA-Z]([-_.]?[0-9a-zA-Z])*@[0-9a-zA-Z]([-_.]?[0-9a-zA-Z])*.[a-zA-Z]{2,3}$/i;
    if(target.name === "email") {
      // this.setState((state) => ({...state, email:target.value}));
      this.setState((state) => {
        return {email:target.value}
      });

      if(emailRegExp.test(target.value)){
        this.checkEmail.current.innerText = "O";
      }else if(target.value.trim()===""){
        this.checkEmail.current.innerText = "";
      }else{
        this.checkEmail.current.innerText = "X";
      }
    }

    if(target.name ==="password") {
      target.value.trim() ==="" ? this.checkPassword.current.innerText = ``: this.checkPassword.current.innerText = "O";
    }
    if(this.passwordRef.current.value.length && emailRegExp.test(this.state.email) ){
      this.setState(state =>({btnOn:false}));
    }else{
      this.setState(state =>({btnOn:true}));
    }
  }
  render(){

    return (
      <Row 
        style={{height:"100vh"}}
        justify="center"
        align="middle"
      >
        <Col span={6}></Col>
        <Col span={12} className={styles.signinWrapper}>
          <div className={styles.signinImg}></div>
          <div className={styles.shadow}></div>
          <div className={styles.signinForm}>
            <h1 className={styles.signinTitle}>
              <p>쉬다가요</p>
              나의 작은 도서관
            </h1>
            <p className={styles.inputBox}>
              <input type="text" placeholder="이메일"name="email" value={this.state.email} onChange={this.change} />
              <span className={styles.checkEmail} ref={this.checkEmail}></span>
            </p>
            <p className={styles.inputBox}>
              <input type="password" placeholder="비밀번호" name="password" ref={this.passwordRef} onChange={this.change} />
              <span className={styles.checkPassword} ref={this.checkPassword}></span>
            </p>
            <Button type="primary" onClick={this.click} className={styles.signinBtn} ref={this.signinBtn} disabled={this.state.btnOn}>입장하기</Button>
          </div>
        </Col>
        <Col span={6}></Col>
      </Row>
    );
  }
};
export default withAuth(Signin,false);