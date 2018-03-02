import configureMockStore from 'redux-mock-store'
import thunk from 'redux-thunk'
import fetchMock from 'fetch-mock'

import * as actions from '../../../../../src/redux-flow/reducers/categories/actions'
import * as actionCreators from '../../../../../src/redux-flow/reducers/categories/action-creators'

const middlewares = [ thunk ]
const mockStore = configureMockStore(middlewares)

describe('categories actions', () => {
  afterEach(() => {
    fetchMock.reset()
    fetchMock.restore()
  })

  it('getCategories should dispatch a GET_CATEGORIES action', () => {
    expect(actionCreators.getCategories([]))
      .toEqual({
        type: actions.GET_CATEGORIES,
        payload: []
      })
  })

  it('fetchCategories should dispatch a GET_CATEGORIES action', () => {
    const store = mockStore([])

    const categories = [{ name: 'react', path: 'react'}]

    const expectedActions = [{
      type: actions.GET_CATEGORIES,
      payload: categories
    }]

    fetchMock.get('*', { categories })

    store.dispatch(actionCreators.fetchCategories())
      .then(() => expect(store.getActions()).toEqual(expectedActions))
  })
})
