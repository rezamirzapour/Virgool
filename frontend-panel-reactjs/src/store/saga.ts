import { takeEvery } from "redux-saga/effects";
import { fetchProfileSaga, loginSaga } from "./auth";
import { fetchRolesSaga, fetchPermissoinsSaga, fetchCategoriesSaga } from './entities'

export const sagaActions = {
    LOGIN_SAGA: 'LOGIN_SAGA',
    AFTER_LOGIN_SAGA: 'AFTER_LOGIN_SAGA',
    FETCH_PROFILE_SAGA: 'FETCH_PROFILE_SAGA',
    FETCH_ROLES_SAGA: 'FETCH_ROLES_SAGA',
    FETCH_PERMISSIONS_SAGA: 'FETCH_PERMISSIONS_SAGA',
    FETCH_CATEGORIES_SAGA: 'FETCH_CATEGORIES_SAGA',
}

export default function* rootSaga() {
    yield takeEvery(sagaActions.LOGIN_SAGA, loginSaga);
    // yield takeEvery(sagaActions.AFTER_LOGIN_SAGA, fetchProfileSaga);
    yield takeEvery(sagaActions.FETCH_PROFILE_SAGA, fetchProfileSaga)
    yield takeEvery(sagaActions.FETCH_ROLES_SAGA, fetchRolesSaga);
    yield takeEvery(sagaActions.FETCH_PERMISSIONS_SAGA, fetchPermissoinsSaga);
    yield takeEvery(sagaActions.FETCH_CATEGORIES_SAGA, fetchCategoriesSaga);
}
