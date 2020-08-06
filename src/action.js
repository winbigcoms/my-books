// 액션의 타입을 정의하여 변수로 뺀다.
import BookService from "./services/bookService";
import UserService from "./services/UserService";
import TokenService from "./services/tokenService";

export const START_LOADING = "START_LOADING";
export const END_LOADING = "END_LOADING";

// 액션 객체를 만들어 내는 액션 생성자 함수 만들기
export function startLoading () {
  return {
    type : START_LOADING
  }
}

export function endLoading () {
  
  return {
    type : END_LOADING
  }
}

export const START_GET_BOOKS = "START_GET_BOOKS";
export const SUCCESS_GET_BOOKS = "SUCCESS_GET_BOOKS";
export const FAIL_GET_BOOKS = "FAIL_GET_BOOKS";

export function startGetBooks(){
  return {type:START_GET_BOOKS};
}
export function successGetBooks(books){
  return {
    type:SUCCESS_GET_BOOKS,
    books
  };
}
export function failGetBooks(err){
  return {type:FAIL_GET_BOOKS
  ,err
  };
}

export function getBooksThunk(){
  return async(dispatch,getState)=>{
    try{
      dispatch(startGetBooks());
      sleep(3000);
      const state = getState();
      const token = state.auth.token;
      const books = await BookService.getBooks(token);
      dispatch(successGetBooks(books))
    }catch(e){
      dispatch(failGetBooks(e))
    }
  }
}

export const LOGIN_SUCCESS = "LOGIN_SUCCESS"
export const LOGIN_START = "LOGIN_START"
export const LOGIN_FAIL = "LOGIN_FAIL"

export const loginStart = ()=>({
  type:LOGIN_START
})
export const loginSuccess = (token)=>({
  type:LOGIN_SUCCESS,
  token
})
export const loginFail = (error)=>({
  type:LOGIN_FAIL,
  error
})
export const loginThunk= (email,password,history)=>{
  return async(dispatch)=>{
    try{
      dispatch(loginStart);
      sleep(3000);
      const token = await UserService.login(email,password)
      TokenService.saveToken(token);
      dispatch(loginSuccess(token));
      history.push("/");
    }catch(e){
      dispatch(loginFail(e));
    }
  }
}


function sleep(ms){
  return new Promise((res)=>{
    setTimeout(()=>{res()},ms)
  });
}