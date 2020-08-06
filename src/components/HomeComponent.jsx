// @flow
import  React, { useState, useRef, useEffect } from 'react';
import styles from "../styles/Home.module.scss";
import {LinkOutlined} from "@ant-design/icons";

export function HomeComponent({loading,error,books,getBooks}) {
  const [state,setState] = useState({viewBooks:[],sort:""});
  const sortWhat = useRef(null);
  const searchInput = useRef("");

  useEffect(()=>{
    getBooks();
  },[getBooks])

  useEffect(()=>{
    setState((states)=>({...states,viewBooks:books}));
  },[books, setState])

  function catchSortWhat(e){
    let copyBook = books;
    const sortedBooks =copyBook.sort(titleSort(e.target.value));
    setState({...state,viewBooks:sortedBooks});
  }

  function search(e){
    let copyBook = books;
    const searchBook = copyBook.filter(
      book => book.title.match(new RegExp(e.target.value),"ig")
    );
    console.log(e.target.value,searchBook)
    setState(states => ({...states,viewBooks:searchBook}));
  }
  return (
    <div className={styles.wrapper}>
      <header className={styles.header}>
        <h1><p>어서와요</p>나의 작은 도서관</h1>
        <input type="text"onChange={search} ref={searchInput}/>
        <label>
          <select name="정렬" ref={sortWhat} onChange={catchSortWhat}>
            <option value="title">제목으로 정렬</option>
            <option value="author">저자로 정렬</option>
            <option value="createdAt">추가날짜로 정렬</option>
          </select>
        </label>
      </header>
      <div className={styles.main}>
        <ul className={styles.books}>
          <h2 className={styles.a11yHidden}>도서</h2>
          {state.viewBooks.map(book =>(<li key={book.bookId} className={styles.bookBox}>
              <div className={styles.book}>
                <ul className={styles.hardcover_front}>
                  <li style={{
                    backgroundImage:`url(./images/${book.bookId}.jpg)`,
                    backgroundRepeat:"no-repeat"
                  }}>
                  </li>
                  <li></li>
                </ul>
                <ul className={styles.page}>
                  <li>
                    <span className={styles.bookMessage}>
                      {book.message.length < 30 ? 
                        book.message :
                        book.message.slice(0,28)+"..."
                        }
                    </span>
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
              <a className={styles.btn} target="_blank" rel="noopener noreferrer" href={book.url} aria-label="yes24로 이동">책보러가기<LinkOutlined /></a>
            </div>
          </li>))}
        </ul>
        <div className={styles.functionUI}>

        </div>
      </div>
    </div>
  );
};

function titleSort(key){
  return (a,b)=> (a[key] > b[key] ? 1 : (a[key] < b[key] ? -1 : 0))
}