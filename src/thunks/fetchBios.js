import { isLoading, hasErrored } from '../actions'

export const fetchBios = (staffArray) => {
  return (dispatch) => {
    try {
      dispatch(isLoading(true))
      const unresolvedPromises = staffArray.map(async staffMember => {
        const response = await fetch(staffMember.info)
        if(!response.ok) {
          throw Error(response.statusText)
        }
        dispatch(isLoading(false))
        const data = await response.json()
        return { ...data, name: staffMember.name}
      })
      return Promise.all(unresolvedPromises)
    } catch (error) {
      dispatch(hasErrored(true))
    }
  }
}
