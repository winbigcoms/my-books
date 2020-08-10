// @flow
import React from 'react';
import {Link} from "react-router-dom"

import { Button } from 'antd';
import { useRef } from 'react';
import styles from "../styles/AddBook.module.scss";

export function AddBookComponent({post}) {
  const addBookTitle = useRef(null);
  const addBookAuthor = useRef(null);
  const addBookMessage = useRef(null);
  const addBookUrl = useRef(null);

  function postBook() {
    const bookInfo = {
      title:addBookTitle.current.value
      ,author:addBookAuthor.current.value
      ,message:addBookMessage.current.value,
      url:addBookUrl.current.value
    };
    post(bookInfo);
  }
  return (
    <div className={styles.addBookWarpper}>
      <div className={styles.inputContainer}>
        <Link to="/" className={styles.goback}>돌아가기</Link>
        <h1>서재에 책 입고하기</h1>
          <label>
            <span>
              제목:
            </span>
            <input type="text" ref={addBookTitle}/>
          </label>
          <label>
            <span>
              저자:
            </span>
            <input type="text" ref={addBookAuthor}/>
          </label>
          <label className={styles.addBookMessage}>
            <span>
              감상평: 
            </span>
            <textarea ref={addBookMessage}/>
          </label>
          <label>
            <span>
              링크:
            </span>
            <input type="text" ref={addBookUrl}/>
          </label>
          <Button onClick={postBook} className={styles.postBook}>입고</Button>
      </div>
    </div>
  );
};