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
