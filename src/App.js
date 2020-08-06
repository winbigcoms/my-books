import React from 'react';
import './App.css';
import { BrowserRouter, Switch, Route } from 'react-router-dom';
import { FatalPage } from './pages/FatalPage';
import Signin from './pages/Signin';
import Home from './pages/Home';
import { NotFound } from './pages/NotFound';
import { ErrorBoundary } from 'react-error-boundary';
import books from './pages/books';


function App() {
  return (
    <ErrorBoundary FallbackComponent={FatalPage}>
        <BrowserRouter>
          <Switch>
            <Route exact path="/signin" component={Signin}/>
            <Route exact path="/books" component={books}/>
            <Route exact path="/" component={Home}/>
            <Route component={NotFound}/>
          </Switch>
        </BrowserRouter>      
    </ErrorBoundary>
  );
}

export default App;
