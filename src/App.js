import React from 'react';
import './App.css';
import { Switch, Route } from 'react-router-dom';
import { FatalPage } from './pages/FatalPage';
import Signin from './pages/Signin';
import Home from './pages/Home';
import { NotFound } from './pages/NotFound';
import { ErrorBoundary } from 'react-error-boundary';
import books from './pages/books';
import { ConnectedRouter } from 'connected-react-router';
import { history } from './redux/create';
import { addPage } from './pages/addPage';


function App() {
  return (
    <ErrorBoundary FallbackComponent={FatalPage}>
        <ConnectedRouter history={history}>
          <Switch>
            <Route exact path="/signin" component={Signin}/>
            <Route exact path="/books" component={books}/>
            <Route exact path="/addPage" component={addPage}/>
            <Route exact path="/" component={Home}/>
            <Route component={NotFound}/>
          </Switch>
        </ConnectedRouter>      
    </ErrorBoundary>
  );
}

export default App;
