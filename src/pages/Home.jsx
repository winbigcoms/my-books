// @flow
import React, { useState, useEffect, useRef } from 'react';
import { withAuth } from '../HOCs/withAuth';
import axios from 'axios';
import styles from "../styles/Home.module.scss";
import {LinkOutlined} from "@ant-design/icons"
function Home (props) {
  
  const [states,setState] = useState({
    books:[],
    loading:false,
    error:null,
    sort:"title"
  });
  const sortWhat = useRef(null)
  
  useEffect( ()=>{
    async function initialize(){
      try{
        const res = await axios.get("https://api.marktube.tv/v1/book",{
          headers:{Authorization:`Bearer ${props.token}`}
        });

        const books = res.data;
        books.sort(titleSort(states.sort));
        setState({...states,books});
      }catch(e){
        console.log(e);
        setState({...states,error:e})
      }
    };
    initialize()
  },[])

  function catchSortWhat(e){
    let copyBooks = states.books;
    copyBooks.sort(titleSort(e.target.value));
    setState({...states,books:copyBooks,sort:e.target.value});
  }
  return (
    <div className={styles.wrapper}>
      <header className={styles.header}>
        <h1><p>어서와요</p>나의 작은 도서관</h1>
        <label>
          <select name="정렬" value={states.sort} ref={sortWhat} onChange={catchSortWhat}>
            <option value="title">제목</option>
            <option value="author">저자</option>
            <option value="createdAt">추가날짜</option>
          </select>
        </label>
      </header>
      <ul className={styles.books}>
        <h2 className={styles.a11yHidden}>도서</h2>
        {states.books.map(book =>(<li key={book.bookId} className={styles.bookBox}>
					  <div className={styles.book}>
							<ul className={styles.hardcover_front}>
								<li>
									<div>
										<h3 className={styles.bookTitle}>{book.title}</h3>
									</div>
								</li>
								<li></li>
							</ul>
							<ul className={styles.page}>
								<li>
                  <span className={styles.bookMessage}>{book.message}</span>
								</li>
								<li></li>
								<li></li>
								<li></li>
							</ul>
						</div>
          <div className={styles.divider}></div>
          <div className={styles.bookInfo}>
            <h3>제목: {book.title}</h3>
            <p>저자: {book.author}</p>
            <p>책장에 추가한 날짜: {book.createdAt.slice(0,16).split("T").join("/")}</p>
            <p>마지막 업데이트: {book.updatedAt.slice(0,16).split("T").join("/")}</p>
            <a className={styles.btn} href={book.url} aria-label="yes24로 이동">책보러가기<LinkOutlined /></a>
          </div>
        </li>))}
      </ul>
    </div>
  );
};
export default withAuth(Home, true);

function titleSort(key){
  return (a,b)=> (a[key] > b[key] ? 1 : (a[key] < b[key] ? -1 : 0))
}