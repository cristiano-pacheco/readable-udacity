import deepFreeze from 'deep-freeze'
import categories from '../../../../../src/redux-flow/reducers/categories'
import { GET_CATEGORIES } from '../../../../../src/redux-flow/reducers/categories/actions'

it('should get categories', () => {
  const before = deepFreeze([])
  const action = deepFreeze({
    type: GET_CATEGORIES,
    payload: [{ name: 'category test' }, { name: 'category test 2' }]
  })

  const after = [
    { value: 'category test', text: 'category test' },
    { value: 'category test 2', text: 'category test 2' }
  ]

  expect(categories(before, action)).toEqual(after)
})
