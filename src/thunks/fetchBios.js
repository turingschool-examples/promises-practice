import { isLoading, hasErrored } from '../actions'

export const fetchBios = (staffArray) => {
  return (dispatch) => {
    dispatch(isLoading(true))
    const unresolvedPromises = staffArray.map(staffMember => {
      return fetch(staffMember.info)
      .then(response => {
        if (!response.ok) {
          throw Error(response.statusText)
        }
        dispatch(isLoading(false))
        return response
      })
      .then(response => response.json())
      .then(data => ({...data, name: staffMember.name}))
      .catch(() => dispatch(hasErrored(true)))
    })
    return Promise.all(unresolvedPromises);
  }
}
