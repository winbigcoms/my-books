import {all} from "redux-saga/effects"
import {authSaga} from '../modules/auth'
import {booksSaga} from '../modules/books'

export default function* rootSaga() {
  yield all([
    authSaga(),
    booksSaga()
  ]);
}