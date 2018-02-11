import { expect } from 'chai'
import deepFreeze from 'deep-freeze'
import posts from './index'
import { GET_POSTS } from './actions'

it('should get all posts', () => {
  const before = deepFreeze([])
  const payload = {
    id: 'id',
    timestamp: Date.now(),
    title: 'post title',
    body: 'body post',
    author: 'author of post',
    category: 'category post'
  }
  const action = deepFreeze({
    type: GET_POSTS,
    payload: [payload]
  })
  const after = [payload]
  expect(posts(before, action)).to.be.deep.equal(after)
})
