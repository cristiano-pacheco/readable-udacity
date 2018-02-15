import { expect } from 'chai'
import deepFreeze from 'deep-freeze'
import posts from './index'
import { GET_POSTS, ADD_POST } from './actions'

const before = deepFreeze([])
const payload = {
  id: 'id',
  timestamp: Date.now(),
  title: 'post title',
  body: 'body post',
  author: 'author of post',
  category: 'category post'
}

it('should get all posts', () => {
  const action = deepFreeze({
    type: GET_POSTS,
    payload: [payload]
  })
  const after = [payload]
  expect(posts(before, action)).to.be.deep.equal(after)
})

it('should add a new post', () => {
  const action = deepFreeze({
    type: ADD_POST,
    payload
  })
  const after = [payload]
  expect(posts(before, action)).to.be.deep.equal(after)
})
