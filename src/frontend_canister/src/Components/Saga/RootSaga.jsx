import { all } from 'redux-saga/effects';
import { actorSaga } from './actorBindSaga';
import { internetIdentitySaga } from './InternetIdentitySaga';
import userSaga from './UserLoginSaga';

export default function* rootSaga() {
    yield all([
        actorSaga(),
        internetIdentitySaga(),
        userSaga(),
    ]);
}
