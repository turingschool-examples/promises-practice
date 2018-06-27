import { fetchBios } from '../fetchBios'
import { isLoading, hasErrored } from '../../actions'

describe('fetchBios', () => {
  let mockStaffArray
  let mockDispatch

  beforeEach(() => {
    mockStaffArray = ['Christie', 'Will']
    mockDispatch = jest.fn()
  })

  it('should call dispatch with isLoading(true)', async () => {
    window.fetch = jest.fn().mockImplementation(() => Promise.resolve({
      ok: true,
      json: () => Promise.resolve({
        bio: 'Some info about a staff member',
        image: 'http://localhost:3001/christie.jpg'
      })
    }))
    const thunk = fetchBios(mockStaffArray)

    await thunk(mockDispatch)

    expect(mockDispatch).toHaveBeenCalledWith(isLoading(true))
  })

  it('should dispatch isLoading(false) if the response is ok', async () => {
    window.fetch = jest.fn().mockImplementation(() => Promise.resolve({
      ok: true,
      json: () => Promise.resolve({
        bio: 'Some info about a staff member',
        image: 'http://localhost:3001/christie.jpg'
      })
    }))

    const thunk = fetchBios(mockStaffArray)

    await thunk(mockDispatch)

    expect(mockDispatch).toHaveBeenCalledWith(isLoading(false))
  })

  it('should dispatch hasErrored(true) if the response is not ok', async () => {
    window.fetch = jest.fn().mockImplementation(() => Promise.resolve({
      ok: false
    }))

    const thunk = fetchBios(mockStaffArray)

    await thunk(mockDispatch)

    expect(mockDispatch).toHaveBeenCalledWith(hasErrored(true))
  })
})
