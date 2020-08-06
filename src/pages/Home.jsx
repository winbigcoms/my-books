// @flow
import React from 'react';
import { withAuth } from '../HOCs/withAuth';
import { HomeContainer } from '../containers/HomeContainer';

function Home (props) {  
  return (
   <HomeContainer/>
  );
};

export default withAuth(Home, true);