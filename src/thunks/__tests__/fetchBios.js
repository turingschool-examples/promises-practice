import { fetchBios } from '../fetchBios'
import { isLoading, hasErrored } from '../../actions'

describe('fetchBios', () => {
  let mockStaffArray
  let mockStaffMember
  let mockDispatch

  beforeEach(() => {
    mockStaffArray = [{name: 'Christie', info: 'www.linktomoreinfo'}]
    mockStaffMember = {image: 'some image', bio: 'some bio'}
    mockDispatch = jest.fn()
    window.fetch = jest.fn().mockImplementation(() => Promise.resolve({
      ok: true,
      json: () => Promise.resolve(mockStaffMember)
    }))
  })

  it('should call fetch with the correct param', async () => {
    const thunk = fetchBios(mockStaffArray)

    await thunk(mockDispatch)

    expect(window.fetch).toHaveBeenCalledWith(mockStaffArray[0].info)
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
