import { all } from 'redux-saga/effects';
import { actorSaga } from './actorBindSaga';
import { internetIdentitySaga } from './InternetIdentitySaga';


export default function* rootSaga() {
    yield all([
        actorSaga(),
        internetIdentitySaga(),
    ]);
}
