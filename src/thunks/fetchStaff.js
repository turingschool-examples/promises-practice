import { isLoading, hasErrored, setStaff } from '../actions'
import { fetchBios } from './fetchBios'

export const fetchStaff = (url) => {
  return async (dispatch) =>  {
    try {
      dispatch(isLoading(true))
      const response = await fetch(url)
      if(!response.ok) {
        throw Error(response.statusText)
      }
      const data = await response.json()
      const staff = await dispatch(fetchBios(data.bio))
      dispatch(isLoading(false))
      dispatch(setStaff(staff))
    } catch (error) {
      dispatch(hasErrored(error.message))
    }
  }
}
