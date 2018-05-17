export const isLoading = (bool) => ({
  type: 'IS_LOADING',
  isLoading: bool
})

export const hasErrored =(bool) => ({
  type: 'HAS_ERRORED',
  hasErrored: bool
})

export const staffFetchDataSuccess = (staff) => ({
  type: 'STAFF_FETCH_DATA_SUCCESS',
  staff
})

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
