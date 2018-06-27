import { isLoading, hasErrored, staffFetchDataSuccess } from '../actions'
import { fetchBios } from './fetchBios'

export const fetchStaff = (url) => {
  return (dispatch) =>  {
    dispatch(isLoading(true))
    fetch(url)
      .then(response => {
        if (!response.ok) {
          throw Error(response.statusText)
        }
        dispatch(isLoading(false))
        return response
    })
    .then(response => response.json())
    .then(data => dispatch(fetchBios(data.bio)))
    .then(staff => dispatch(staffFetchDataSuccess(staff)))
    .catch(() => dispatch(hasErrored(true)))
  }
}
