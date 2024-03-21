import { call, put, takeLatest, select } from "redux-saga/effects";
import { setUser, setIsPresent } from "../Reducers/UserLogin";


const selectActor = (currState) => currState.actors.actor;
const selectActorContent = (currState) => currState.actors.content;



function* registerUserFunction(action) {
    try {
        const Actor = yield select(selectActor);

        console.log("action.payload", action.payload)
        console.log(Actor);
        const user = yield call([Actor, Actor.register_user], action.payload);
        console.log("user",user);
        yield put(setUser(action.payload));
        // console.log(action.payload);

    } catch (e) {
        console.log(e);
    }

}

function* CheckUserFunction() {

    try {
        const Actor = yield select(selectActor);
        console.log(Actor);
        const isPresent = yield call([Actor, Actor.is_user_exist_bool]);
        console.log(isPresent);
        if (!isPresent.err) {
            yield put(setIsPresent({
                isUserPresent: false,
            }));
        } else {
            yield put(setIsPresent({
                isUserPresent: true,
            }));
            const userData = yield call([Actor,Actor.get_user_info]);
            yield put(setUser(userData));

        }
    } catch (e) {
        console.log(e.message);
    }
}



// function* UpdateUserFunction(action) {
//     try {
//         const Actor = yield select(selectActor);
//         console.log(Actor);

//         console.log("action.payload", action.payload)
//         const userData = yield call([Actor, Actor.update_user], action.payload);
//         yield put(setUser(userData));

//     }
//     catch (e) {
//         console.log(e.message);

//     }
// }

// function* get_user_info(){
//     try{
//         const Actor = yield select(selectActor);
//         console.log(Actor);
//         const userData = yield call([Actor, Actor.get_user_info]);
//         yield put(setUser(userData));

//     }catch (e){

//     }
// }


function* userSaga() {
    yield takeLatest('USER_REGISTER_REQUESTED', registerUserFunction);
    yield takeLatest('CHECK_USER_PRESENT', CheckUserFunction);
    // yield takeLatest('Update_UserFunction',UpdateUserFunction);

}

export default userSaga;