import UserService from "../../services/UserService";
import TokenService from "../../services/tokenService";
import {
  push
} from "connected-react-router";
import {
  put,
  delay,
  call,
  takeLatest
} from "redux-saga/effects";
import {
  createActions,
  handleActions
} from "redux-actions";

const initState = {
  token: null,
  loading: false,
  error: null
}
//  create action
const {start,success,fail,logoutStart,logoutSuccess,logoutFail} = createActions(
  {
    SUCCESS : token=>({token}),
  },
  'START',
  'FAIL',
  'LOGOUT_START',
  'LOGOUT_SUCCESS',
  'LOGOUT_FAIL',
  {
    prefix:'mybooks/auth'
  }
)

// handle Action
const auth = handleActions({
    START: (state) => ({
      loading: true,
      token: null,
      error: null
    }),
    SUCCESS: (state, action) => ({
      loading: false,
      token: action.payload.token,
      error: null
    }),
    FAIL: (state, action) => ({
      loading: false,
      token: state.token,
      error: action.payload.message
    }),
    LOGOUT_START:(state)=>({
      loading: true,
      token: state.token,
      error: null
    }),
    LOGOUT_SUCCESS:()=>({
      loading: false,
      token: null,
      error: null
    }),
    LOGOUT_FAIL:(state,action)=>({
      loading: false,
      token: state.token,
      error: action.payload.message
    })
  },
  initState, {
    prefix: 'mybooks/auth'
  }
)
// export reducer for combine
export default auth

const START_LOGIN_SAGA = 'START_LOGIN_SAGA';
const START_LOGOUT_SAGA = 'START_LOGIN_SAGA';

export const startLoginSagaActionCreator = (email, password) => ({
  type: START_LOGIN_SAGA,
  payload: {
    email,
    password
  }
})
export const startLogoutSagaActionCreator = (token) => ({
  type: START_LOGOUT_SAGA,
  payload: {token}
})

function* startLoginSaga(action) {
  const {email,password} = action.payload;
  try {
    yield put(start())
    yield delay(2000);
    const token = yield call(UserService.login, email, password);
    TokenService.saveToken(token);
    yield put(success(token))
    yield put(push("/"));
  } catch (e) {
    yield put(fail(e));
  }
}

function* startLogoutSaga(action) {
  try {
    const {token} = action.payload;
    yield put(logoutStart())
    yield delay(2000);
    yield call(UserService.logout, token);
    TokenService.clear();
    yield put(logoutSuccess(null))
    yield put(push("/signin"));
  } catch (e) {
    yield put(logoutFail(e));
  }
}

export function* authSaga() {
  yield takeLatest(START_LOGOUT_SAGA, startLogoutSaga);
  yield takeLatest(START_LOGIN_SAGA, startLoginSaga);
}