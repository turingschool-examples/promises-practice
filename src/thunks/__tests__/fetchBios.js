import { fetchBios } from '../fetchBios'
import { isLoading, hasErrored } from '../../actions'

describe('fetchBios', () => {
  let mockStaffArray
  let mockDispatch

  beforeEach(() => {
    mockStaffArray = ['Christie', 'David']
    mockDispatch = jest.fn()
  })

  it('should dispatch hasErrored with a message if the response is not ok', async () => {
    window.fetch = jest.fn().mockImplementation(() => Promise.resolve({
      ok: false,
      statusText: 'Something went wrong'
    }))

    const thunk = fetchBios(mockStaffArray)

    await thunk(mockDispatch)

    expect(mockDispatch).toHaveBeenCalledWith(hasErrored('Something went wrong'))
  })
})
