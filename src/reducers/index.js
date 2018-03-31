import { combineReducers } from 'redux';
import { isLoading, hasErrored, staff } from './staffReducer';

const rootReducer = combineReducers({
  staff,
  isLoading,
  hasErrored
})

export default rootReducer;
