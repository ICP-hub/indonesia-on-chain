import { call, put, takeLatest, select } from "redux-saga/effects";
// import { setUser, setIsPresent } from "../Reducers/UserLogin";


const selectActor = (currState) => currState.actors.content;






function* getallcourseFunction() {
    try {
        const Actor = yield select(selectActor);

        // console.log("action.payload", action.payload)
        const user = yield call([Actor, Actor.getallCourse]);
        // console.log(user);
        // console.log("Hello");
        // yield put(setUser(action.payload));
        // console.log(action.payload);

    } catch (e) {
        // console.log("hi");
        console.log(e);
    }

}




function* courseSaga() {
   
    yield takeLatest('get_all_course', getallcourseFunction);
    

}

export default courseSaga;