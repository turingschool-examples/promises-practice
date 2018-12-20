import { combineReducers } from 'redux';
import { isLoading, hasErrored, staff } from './staffReducer';

const rootReducer = combineReducers({
  staff,
  isLoading,
  error: hasErrored
})

export default rootReducer;
