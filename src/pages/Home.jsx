// @flow
import React, { useState, useEffect } from 'react';
import { withAuth } from '../HOCs/withAuth';
import axios from 'axios';
function Home (props) {
    const [states,setState] = useState({
    books:[{title:"ds"}],
    loading:false,
    error:null
  });

  useEffect( ()=>{
    async function initialize(){
      try{
        const res = await axios.get("https://api.marktube.tv/v1/book",{headers:{
          Authorization:`Bearer ${props.token}`
        }});
        const books = res.data;
        setState(...states,books);
      }catch(e){
        console.log(e);
        setState({...states,error:e})
      }
    }
    initialize()
  },[])

    return (
      <div>
      </div>
    );
};
export default withAuth(Home, true);