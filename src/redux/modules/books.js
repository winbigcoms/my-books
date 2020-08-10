//  보낸 액션과 현재 상태를 이용해서 새로운 상태를 만드는 함수
//  최초 상태는 항상 고정적으로 만들어 준다.

import BookService from "../../services/bookService";
import {createActions, handleActions}from 'redux-actions';
import {put,select, delay,call,takeLatest} from "redux-saga/effects";
import { push } from "connected-react-router";


const initState = {
  loading: false,
  books:[],
  error:null
}
// 액션 객체를 만들어 내는 액션 생성자 함수 만들기
// 액션 생성자 createAction
const {start,success,fail} = createActions(
  {
    SUCCESS : books=>({books}),
  },
  'START',
  'FAIL',
  {
    prefix:'mybooks/books'
  }
)

// handle Action
const books = handleActions({
    START: (state) => ({
      loading: false,
      books:state.books,
      error:null
    }),
    SUCCESS: (state,action)=>({
      loading: false,
      books: action.payload.books,
      error:null
    }),
    FAIL : (state,action)=>({  
      loading: false,
      books:[],
      error:action.payload.e
    })
  },
  initState,
  {
    prefix:'mybooks/books'
  }
)
export default books


// 사가 액션명
const START_GET_BOOK = 'START_GET_BOOK'
const START_POST_BOOK = 'START_POST_BOOK'
const START_DELETE_BOOK = 'START_DELETE_BOOK'

// 사가 액션 생성자
export const startGetBookActionCreator = () => ({
  type: START_GET_BOOK
})
export const startPostBookActionCreator = (bookInfo) => ({
  type: START_POST_BOOK,
  payload: {
    bookInfo
  }
})
export const startDeleteBookActionCreator = (bookId) => ({
  type: START_DELETE_BOOK,
  payload: {
    bookId
  }
})

// 사가함수
function* startGetBooksSaga (){
  try{
    yield put(start());
    delay(3000);
    const token =  yield select((state)=>state.auth.token);
    const books = yield call(BookService.getBooks,token)
    yield put(success(books))
  }catch(e){
    yield put(fail(e))
  }
}
function* startPostBooksSaga (action){
  const {bookInfo} = action.payload;
  try{
    yield put(start());
    delay(3000);
    const token =  yield select((state)=>state.auth.token);
    yield call(BookService.PostBooks,token,bookInfo);
    const books = yield call(BookService.getBooks,token)
    yield put(success(books));
    yield put(push("/"));
  }catch(e){
    yield put(fail(e))
  }
}

function* startDeleteBookSaga (action){
  const {bookId} = action.payload;
  try{
    yield put(start());
    delay(3000);
    const token =  yield select((state)=>state.auth.token);
    yield call(BookService.deleteBook,token,bookId);
    const books = yield call(BookService.getBooks,token)
    yield put(success(books));
    yield put(push("/"));
  }catch(e){
    yield put(fail(e))
  }
}
// 사가 함수 바인딩
export function* booksSaga() {
  yield takeLatest(START_GET_BOOK,startGetBooksSaga)
  yield takeLatest(START_POST_BOOK,startPostBooksSaga)
  yield takeLatest(START_DELETE_BOOK,startDeleteBookSaga)
}