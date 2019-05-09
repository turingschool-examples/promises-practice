import { hasErrored } from '../actions'

export const fetchBios = (staffArray) => {
  return (dispatch) => {
    const unresolvedPromises = staffArray.map(async staffMember => {
      try {
        const response = await fetch(staffMember.info)
        if(!response.ok) {
          throw Error(response.statusText)
        }
        const data = await response.json()
        return { ...data, name: staffMember.name}
      } catch (error) {
        dispatch(hasErrored(error.message))
        }
      })
    return Promise.all(unresolvedPromises)
  }
}
