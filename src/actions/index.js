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
