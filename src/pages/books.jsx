// @flow
import React from 'react';
import { BookListContainer } from '../containers/BookListContainer';
import { withAuth } from '../HOCs/withAuth';
function books() {
  return (
    <div>
      <BookListContainer/>
    </div>
  );
};

export default withAuth(books, true);