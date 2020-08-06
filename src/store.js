import {createStore, applyMiddleware}from 'redux'

import {composeWithDevTools} from "redux-devtools-extension"
import thunk from "redux-thunk"
import TokenService from './services/tokenService'
import reducer from './reducer';


function Store(){
  return(
    createStore(reducer,{
      auth:{
        token:TokenService.getItem(),
        loading:false,
        error:null
      }
    } ,composeWithDevTools(applyMiddleware(thunk)))
  )
}
export default Store;