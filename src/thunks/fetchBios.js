import { isLoading, hasErrored } from '../actions'

export const fetchBios = (staffArray) => {
  return (dispatch) => {
    dispatch(isLoading(true))
    const unresolvedPromises = staffArray.map(async staffMember => {
      try {
        const response = await fetch(staffMember.info)
        if(!response.ok) {
          throw Error(response.statusText)
        }
        dispatch(isLoading(false))
        const data = await response.json()
        return { ...data, name: staffMember.name}
      } catch (error) {
        dispatch(hasErrored(true))
        }
      })
      return Promise.all(unresolvedPromises)
  }
}
