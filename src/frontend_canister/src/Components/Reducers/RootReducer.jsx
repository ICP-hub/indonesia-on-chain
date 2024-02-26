import { combineReducers } from '@reduxjs/toolkit';
import actorReducer from './actorBindReducer';
import internetIdentityReducer from './InternetIdentityReducer';

const rootReducer = combineReducers({
  actors:actorReducer,
  internet: internetIdentityReducer,
});

export default rootReducer;
