//  보낸 액션과 현재 상태를 이용해서 새로운 상태를 만드는 함수
//  최초 상태는 항상 고정적으로 만들어 준다.
import {START_LOADING, END_LOADING, START_GET_BOOKS, SUCCESS_GET_BOOKS, FAIL_GET_BOOKS} from "../action";

const initState = {
  loading: false,
  books:[],
  error:null
}
// 리듀서는 최초 로딩때 ,  action이 들어올 때
export default function books(state = initState,action){
  
  switch (action.type) {
    case START_LOADING: 
      return{loading : true
      };

    case END_LOADING: 
      return{loading : true};

    case START_GET_BOOKS: 
      return{loading : true
        ,books:[]
        ,error:null
      };

    case SUCCESS_GET_BOOKS: 
      return{loading : false
        ,books:action.books
        ,error:null};

    case FAIL_GET_BOOKS: 
      return{loading : false
        ,books:[]
        ,error:action.error};

    default: 
      return state
  }
}