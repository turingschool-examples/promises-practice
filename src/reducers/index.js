import * as sr from './staffReducer'
import { combineReducers } from 'redux'

export const rootReducer = combineReducers({
  staff: sr.staff,
  staffIsLoading: sr.isLoading,
  staffError: sr.hasErrored
})