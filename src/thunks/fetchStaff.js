import { isLoading, hasErrored, staffFetchDataSuccess } from '../actions'
import { fetchBios } from './fetchBios'

export const fetchStaff = (url) => {
  return async (dispatch) =>  {
    try {
      dispatch(isLoading(true))
      const response = await fetch(url)
      if(!response.ok) {
        throw Error(response.statusText)
      }
      dispatch(isLoading(false))
      const data = await response.json()
      const staff = await dispatch(fetchBios(data.bio))
      dispatch(staffFetchDataSuccess(staff))
    } catch (error) {
      dispatch(hasErrored(true))
    }
  }
}
