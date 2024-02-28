import { takeLatest, call, put, select } from "redux-saga/effects";
import { setActor, handleActorRequest, actorError } from '../Reducers/actorBindReducer';
import { createActor } from "../../../../declarations/backend_canister/index";   // import kr lena from ur backend

const selectedIdentity = (state) => state.internet.identity;

function* initActorSaga() {
  try {
    const identity = yield select(selectedIdentity);
    const canisterId = process.env.BACKEND_CANISTER_CANISTER_ID || process.env.CANISTER_ID_BACKEND_CANISTER;  // this u will get from ur backend
    const actor = yield call(createActor, canisterId, { agentOptions: { identity } });
    yield put(setActor(actor));

  } catch (error) {
    console.error('Error in initActorSaga:', error);
    yield put(actorError(error.toString()));
  }
}


export function* actorSaga() {
  yield takeLatest(handleActorRequest().type, initActorSaga);
}
