// @flow
import React, { useState, useEffect, useRef } from 'react';
import { withAuth } from '../HOCs/withAuth';
import axios from 'axios';
function Home (props) {
  
  const [states,setState] = useState({
    books:[],
    loading:false,
    error:null,
    sort:"title"
  });
  const sortWhat = useRef(null)

  function titleSort(key){
    return (a,b)=> (a[key] > b[key] ? 1 : (a[key] < b[key] ? -1 : 0))
  }

  useEffect( ()=>{
    async function initialize(){
      try{
        const res = await axios.get("https://api.marktube.tv/v1/book",{
          headers:{Authorization:`Bearer ${props.token}`}
        });
        const books = res.data;
        books.sort(titleSort(states.sort));
        console.log(books)
        setState({states,books});
      }catch(e){
        console.log(e);
        setState({...states,error:e})
      }
    }
    initialize()
  },[])

  function catchSortWhat(e){
    let copyBooks = states.books;
    copyBooks.sort(titleSort(e.target.value));

    setState({...states,books:copyBooks,sort:e.target.value});
  }
  return (
    <div>
      <ul>
        {states.books.map(book =>(<li key={book.bookId}>
          <h3>제목: {book.title}</h3>
          <p>요약: {book.message}</p>
          <p>저자: {book.author}</p>
          <p>링크: {book.url}</p>
          <p>책장에 추가한 날짜: {book.createdAt.slice(0,19)}</p>
          <p>마지막 업데이트: {book.updatedAt.slice(0,10)}</p>
        </li>))}
      </ul>
      <label>정렬
        <select name="정렬" value={states.sort} ref={sortWhat} onChange={catchSortWhat}>
          <option value="title">제목</option>
          <option value="author">저자</option>
          <option value="createdAt">추가날짜</option>
        </select>
      </label>
    </div>
  );
};
export default withAuth(Home, true);