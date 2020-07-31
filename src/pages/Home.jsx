// @flow
import React, { Component } from 'react';
import { withAuth } from '../HOCs/withAuth';
import axios from 'axios';
import { Row, Col } from 'antd';
import Counter from "../components/counter";
import PersonContext from '../Context/PersonContext';
class Home extends Component {
  
  state = {
    books:[],
    loading:false,
    error:null
  }
  async componentDidMount(){
    this.setState({loading:true});
    try{
      sleep(5000);
      const res = await axios.get("https://api.marktube.tv/v1/book",{headers:{
        Authorization:`Bearer ${this.props.token}`
      }});
      const books = res.data;
      this.setState({books,loading:false});
    }catch(e){
      this.setState({books:[],loading:false,error:true})
    }
  }

  render(){
    return (
      <Row
        style={{
          height:"100vh",
        }}
        justify = "center"
        align = "middle"
      >
        <Col offset={8} span={8}>
          <h1>홈</h1>
          <p>{this.state.loading && "로오디잉주웅"}</p>
          <p>{this.state.error && "에러!"}</p>
          {this.state.error === null && this.state.books.map((book,idx) => (<p key={idx}>{book.title}</p>))}
          <Counter/>
        </Col>
        <PersonContext.Consumer>
      {value=> <p>{JSON.stringify(value)}</p>}
        </PersonContext.Consumer>
      </Row>
    );
  };
};
export default withAuth(Home, true);

function sleep(mis){
  return new Promise((res)=>{
    setTimeout(()=>{res()},mis)
  })
}