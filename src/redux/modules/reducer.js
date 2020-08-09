import books from "./books"
import auth from "./auth"
import {connectRouter} from "connected-react-router"
import { combineReducers } from "redux";

const reducer = (history)=> (
  combineReducers(
    {books,auth,router : connectRouter(history)}
  )
);
export default reducer;
