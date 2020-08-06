// @flow
import * as React from 'react';
import {Row, Col } from 'antd';
import {withAuth} from "../HOCs/withAuth"
import styles from "../styles/Signin.module.scss";
import { SigninContainer } from '../containers/SigninFormContainer';
function Signin (){
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
          <SigninContainer />
        </Col>
        <Col span={6}></Col>
      </Row>
    );
};
export default withAuth(Signin,false);