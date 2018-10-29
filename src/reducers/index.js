import { combineReducers } from 'redux'
import { isLoading, hasErrored, staff } from './staffReducer'

const rootReducer = combineReducers({
  isLoading,
  hasErrored,
  staff
})

export default rootReducer