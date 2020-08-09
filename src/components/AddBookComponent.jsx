// @flow
import React from 'react';
import { Button } from 'antd';
import { useRef } from 'react';
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
    <div>
      <label>제목:
        <input type="text" ref={addBookTitle}/>
      </label>
      <label>저자:
        <input type="text" ref={addBookAuthor}/>
      </label>
      <label>감상평: 
        <input type="text" ref={addBookMessage}/>
      </label>
      <label>링크:
        <input type="text" ref={addBookUrl}/>
      </label>
      <Button onClick={postBook}>전송</Button>
    </div>
  );
};