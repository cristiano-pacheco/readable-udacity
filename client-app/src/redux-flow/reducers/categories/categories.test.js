import { expect } from 'chai'
import deepFreeze from 'deep-freeze'
import categories from './index'
import { GET_CATEGORIES } from './actions'

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

  expect(categories(before, action)).to.be.deep.equal(after)
})
