import { combineReducers } from '@reduxjs/toolkit';
import actorReducer from './actorBindReducer';
import internetIdentityReducer from './InternetIdentityReducer';
import userLoginReducer from './UserLogin'
import utilityReducer from './utilityReducer';
import alertReducer from './Alert'


const rootReducer = combineReducers({
  actors: actorReducer,
  internet: internetIdentityReducer,
  users: userLoginReducer,
  utility: utilityReducer,
  alert: alertReducer
});

export default rootReducer;
