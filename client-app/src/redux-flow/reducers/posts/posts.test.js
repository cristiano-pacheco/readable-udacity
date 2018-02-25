import { expect } from 'chai'
import deepFreeze from 'deep-freeze'
import posts from './index'
import { GET_POSTS, ADD_POST, UP_VOTE, DOWN_VOTE, DELETE_POST } from './actions'

const before = deepFreeze({
  columnSort: null,
  directionSort: null,
  data: [{
    id: 'id_default',
    timestamp: Date.now(),
    title: 'post_title_default',
    body: 'body_post_default',
    author: 'author_default',
    category: 'category_default',
    voteScore: 1
  }]
})

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
  const after = {
    columnSort: null,
    directionSort: null,
    data: [payload]
  }
  expect(posts(before, action)).to.be.deep.equal(after)
})

it('should add a new post', () => {
  const action = deepFreeze({
    type: ADD_POST,
    payload
  })
  const after = {
    columnSort: null,
    directionSort: null,
    data: [
      ...before.data,
      payload
    ]
  }
  expect(posts(before, action)).to.be.deep.equal(after)
})

it('should add one vote to the post', () => {
  const action = deepFreeze({
    type: UP_VOTE,
    payload: 'id_default'
  })
  expect(posts(before, action).data[0].voteScore).to.be.equal(2)
})

it('should subtract one vote to the post', () => {
  const action = deepFreeze({
    type: DOWN_VOTE,
    payload: 'id_default'
  })
  expect(posts(before, action).data[0].voteScore).to.be.equal(0)
})

it('should delete a post by id', () => {
  const action = deepFreeze({
    type: DELETE_POST,
    payload: 'id_default'
  })
  const after = {
    columnSort: null,
    directionSort: null,
    data: []
  }
  expect(posts(before, action)).to.be.deep.equal(after)
})
