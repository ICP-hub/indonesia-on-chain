import { combineReducers } from '@reduxjs/toolkit';
import actorReducer from './actorBindReducer';
import internetIdentityReducer from './InternetIdentityReducer';
import userLoginReducer from './UserLogin'
import utilityReducer from './utilityReducer';

const rootReducer = combineReducers({
  actors:actorReducer,
  internet: internetIdentityReducer,
  users: userLoginReducer,
  utility: utilityReducer
});

export default rootReducer;
