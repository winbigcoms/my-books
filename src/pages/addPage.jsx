// @flow
import React from 'react';
import {Link} from "react-router-dom"
import { AddBookContainer } from '../containers/AddBookContainer';

export function addPage(props) {
  return (
    <div>
      <AddBookContainer/>
      <Link to="/">돌아가기</Link>
    </div>
  );
};