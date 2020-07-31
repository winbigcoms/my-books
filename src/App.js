import React from 'react';
import './App.css';
import { BrowserRouter, Switch, Route } from 'react-router-dom';
import { FatalPage } from './pages/FatalPage';
import Signin from './pages/Signin';
import Home from './pages/Home';
import { NotFound } from './pages/NotFound';
import { ErrorBoundary } from 'react-error-boundary';
import PersonContext from './Context/PersonContext';

const person = {id:0,name:"백승일"}

function App() {
  return (
    <ErrorBoundary FallbackComponent={FatalPage}>
      <PersonContext.Provider value={person}>
        <BrowserRouter>
          <Switch>
            <Route exact path="/signin" component={Signin}/>
            <Route exact path="/" component={Home}/>
            <Route component={NotFound}/>
          </Switch>
        </BrowserRouter>      
      </PersonContext.Provider>
    </ErrorBoundary>
  );
}

export default App;
