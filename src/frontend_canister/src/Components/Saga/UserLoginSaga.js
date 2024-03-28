import { call, put, takeLatest, select } from "redux-saga/effects";
import { setUser, setIsPresent, clearUser } from "../Reducers/UserLogin";


const selectActor = (currState) => currState.actors.actor;
const selectContent = (currState) => currState.actors.content;



function* registerUserFunction(action) {
    const Actor = yield select(selectActor);
    const Content = yield select(selectContent);
    try {
        yield call(setActor());
        // console.log("Actor as present in userSaga user register->", Actor);
        // console.log("Content as present in userSaga user register->", Content);


        // console.log("action.payload", action.payload)
        const user = yield call([Actor, Actor.register_user], action.payload);
        // console.log("user", user);
        yield put(setUser(action.payload));
        // console.log(action.payload);
        const isPresent = yield call([Actor, Actor.is_user_exist], "");
        // console.log("UserLogin Saga ccheck user", isPresent);
    } catch (e) {
        console.log(e);
    }

}

function* StoreUserData(userData) {
    // console.log("User Data Recieved in Saga:->",userData.payload);
    yield put(setIsPresent({ isUserPresent: true }));
    yield put(setUser(userData.payload));
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

// function* get_user_info() {
//     try {
//         const Actor = yield select(selectActor);
//         console.log(Actor);
//         const userData = yield call([Actor, Actor.get_user_info]);
//         yield put(setUser(userData));

//     } catch (e) {

//     }
// }
function* clearData() {
    try {
        yield put(clearUser());
        yield call(() => localStorage.clear());
        console.log("cleared storage")
    } catch (e) {
        console.log(e);
    }
}

function* userSaga() {
    yield takeLatest('USER_REGISTER_REQUESTED', registerUserFunction);
    yield takeLatest('STORE_USER_DATA', StoreUserData);
    yield takeLatest('CLEAR_STORAGE', clearData);
    // yield takeLatest('Update_UserFunction',UpdateUserFunction);

}

export default userSaga;