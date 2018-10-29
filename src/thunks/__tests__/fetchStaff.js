import { fetchStaff } from '../fetchStaff'
import { fetchBios } from '../fetchBios'
import { isLoading, hasErrored, setStaff } from '../../actions';

jest.mock('../fetchBios.js')

describe('fetchStaff', () => {
  let mockUrl
  let mockDispatch

  beforeEach(() => {
    mockUrl = 'www.someurl'
    mockDispatch = jest.fn()
  })

  it('calls dispatch with isLoading(true)', () => {
    const thunk = fetchStaff(mockUrl)
    
    thunk(mockDispatch)

    expect(mockDispatch).toHaveBeenCalledWith(isLoading(true))
  })

  it('should dispatch hasErrored(true) if the response is not ok', async () => {
    window.fetch = jest.fn().mockImplementation(() => Promise.resolve({
      ok: false
    }))

    const thunk = fetchStaff(mockUrl)

    await thunk(mockDispatch)

    expect(mockDispatch).toHaveBeenCalledWith(hasErrored(true))
    expect(mockDispatch).not.toHaveBeenCalledWith(isLoading(false))
  })

  it('should dispatch isLoading(false) if the response is ok', async () => {
    window.fetch = jest.fn().mockImplementation(() => Promise.resolve({
      ok: true
    }))

    const thunk = fetchStaff(mockUrl)

    await thunk(mockDispatch)

    expect(mockDispatch).toHaveBeenCalledWith(isLoading(false))
  })

  it('should dispatch fetchBios if the response is ok', async () => {
    const mockStaff = ['Christie', 'Will']

    window.fetch = jest.fn().mockImplementation(() => Promise.resolve({
      ok: true,
      json: () => Promise.resolve({
        bio: mockStaff
      })
    }))
    const thunk = fetchStaff(mockUrl)

    await thunk(mockDispatch)

    expect(mockDispatch).toHaveBeenCalledWith(fetchBios())
  })

  it('should dispatch setStaff', async () => {
    const mockStaff = ['Christie', 'Will']

    window.fetch = jest.fn().mockImplementation(() => Promise.resolve({
      ok: true,
      json: () => Promise.resolve({
        bio: mockStaff
      })
    }))
    const thunk = fetchStaff(mockUrl)

    await thunk(mockDispatch)

    expect(mockDispatch).toHaveBeenCalledWith(setStaff())
  })
})