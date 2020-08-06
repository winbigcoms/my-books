import { LOGIN_START, LOGIN_SUCCESS, LOGIN_FAIL } from "../action";

const initState = {
  token:null,
  loading: false,
  error:null
}
export default function auth(state = initState, action){
  switch(action.type){
    case LOGIN_START:
      return {
        token:null,
        loading:true,
        error: null
      }
    case LOGIN_SUCCESS:
      return {
        token:action.token,
        loading:false,
        error: null
      }
    case LOGIN_FAIL:
      return {
        token:null,
        loading:false,
        error:action.error
      }
    default : return state
  }  
}