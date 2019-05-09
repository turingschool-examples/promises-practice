import { fetchStaff } from '../fetchStaff'
import { fetchBios } from '../fetchBios'

import { isLoading, hasErrored, setStaff } from '../../actions'

jest.mock('../fetchBios')

describe('fetchStaff', () => {
  let mockUrl
  let mockDispatch

  beforeEach(() => {
    mockUrl = 'www.someurl.com'
    mockDispatch = jest.fn()
  })

  it('calls dispatch with the isLoading action', () => {
    const thunk = fetchStaff(mockUrl)
    // This is the 'inner function' that is returned

    thunk(mockDispatch)

    expect(mockDispatch).toHaveBeenCalledWith(isLoading(true))
  })

  it('should dispatch hasErrored with a message if the response is not ok', async () => {
    window.fetch = jest.fn().mockImplementation(() => Promise.resolve({
      ok: false,
      statusText: 'Something went wrong'
    }))

    const thunk = fetchStaff(mockUrl)
    // This is the 'inner function' that is returned

    await thunk(mockDispatch)

    expect(mockDispatch).toHaveBeenCalledWith(hasErrored('Something went wrong'))
  })

  it('should dispatch fetchBios with correct param if the response is ok', async () => {
    const mockStaff = [{name: 'Christie'}, {name: 'Will'}]

    window.fetch = jest.fn().mockImplementation(() => Promise.resolve({
      ok: true,
      json: () => Promise.resolve({
        bio: mockStaff
      })
    }))

    const thunk = fetchStaff(mockUrl)

    await thunk(mockDispatch)

    expect(mockDispatch).toHaveBeenCalledWith(fetchBios(mockStaff))
  })

  it('should dispatch isLoading(false) if the response is ok', async () => {
    const mockStaff = [{name: 'Christie'}, {name: 'Will'}]
    
    window.fetch = jest.fn().mockImplementation(() => Promise.resolve({
      ok: true,
      json: () => Promise.resolve({
        bio: mockStaff
      })
    }))

    const thunk = fetchStaff(mockUrl)
    // This is the 'inner function' that is returned

    await thunk(mockDispatch)

    expect(mockDispatch).toHaveBeenCalledWith(isLoading(false))
  })

  it('should dispatch setStaff with the correct params', async () => {
    const mockStaff = [{name: 'Christie'}, {name: 'Will'}]
    const finalStaff = [
      {name: 'Christie', bio: 'Christie bio', image: 'Christie image'}, {name: 'Will', bio: 'Will bio', image: 'Will image'}
    ]

    window.fetch = jest.fn().mockImplementation(() => Promise.resolve({
      ok: true,
      json: () => Promise.resolve({
        bio: mockStaff
      })
    }))

    mockDispatch = jest.fn().mockImplementation(() => finalStaff)
    
    const thunk = fetchStaff(mockUrl)

    await thunk(mockDispatch)

    expect(mockDispatch).toHaveBeenCalledWith(setStaff(finalStaff))
  })
})
