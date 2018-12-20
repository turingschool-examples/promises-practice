export const isLoading = (bool) => ({
  type: 'IS_LOADING',
  isLoading: bool
})

export const hasErrored =(message) => ({
  type: 'HAS_ERRORED',
  message
})

export const staffFetchDataSuccess = (staff) => ({
  type: 'STAFF_FETCH_DATA_SUCCESS',
  staff
})
