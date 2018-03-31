import { combineReducers } from 'redux';
import staffReducer from './staffReducer';

const rootReducer = combineReducers({
  staff: staffReducer
})

export default rootReducer;
