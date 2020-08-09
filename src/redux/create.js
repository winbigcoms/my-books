import {createStore, applyMiddleware}from 'redux'

import {composeWithDevTools} from "redux-devtools-extension"
import thunk from "redux-thunk"
import reducer from './modules/reducer'
import TokenService from '../services/tokenService'
import {createBrowserHistory} from "history";
import { routerMiddleware } from 'connected-react-router'
import createSagaMiddleware from "redux-saga";
import rootSaga from './middlewares/saga'

export let history = createBrowserHistory()

const SagaMiddleware = createSagaMiddleware();

const Store = () => {
  const str = createStore(
    reducer(history),
    {
      auth:
      {token:TokenService.getItem(),
      loading:false,
      error:null}
    } 
    ,composeWithDevTools(applyMiddleware(
      thunk,
      routerMiddleware(history),
      SagaMiddleware
    ))
  )
  SagaMiddleware.run(rootSaga);
  return str
}
export default Store;