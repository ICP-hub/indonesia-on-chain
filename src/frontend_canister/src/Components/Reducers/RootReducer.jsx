import { combineReducers } from '@reduxjs/toolkit';
import actorReducer from './actorBindReducer';
import internetIdentityReducer from './InternetIdentityReducer';
import userLoginReducer from './UserLogin'

const rootReducer = combineReducers({
  actors:actorReducer,
  internet: internetIdentityReducer,
  users: userLoginReducer,
});

export default rootReducer;
