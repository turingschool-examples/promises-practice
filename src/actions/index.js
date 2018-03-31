export const isLoading = (bool) => ({
  type: 'IS_LOADING',
  isLoading: bool

})

export const hasErrored = (bool) => ({
  type: 'ERROR',
  error: bool
})

export const staffFetchDataSuccess = (staff) => ({
  type: 'STAFF_FETCH_DATA_SUCCESS',
  staff
})
