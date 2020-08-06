import books from "./books"
import auth from "./auth"
import { combineReducers } from "redux";

const reducer = combineReducers({books,auth});
export default reducer;
