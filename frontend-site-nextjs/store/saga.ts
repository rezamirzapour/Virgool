import { takeEvery } from 'redux-saga/effects';
import { fetchProfileSaga, loginSaga } from './auth';

const LOGIN_SAGA = 'LOGIN_SAGA';
const AFTER_LOGIN_SAGA = 'AFTER_LOGIN_SAGA';

export default function* rootSaga() {
    yield takeEvery(LOGIN_SAGA, loginSaga)
    yield takeEvery(AFTER_LOGIN_SAGA, fetchProfileSaga)
}