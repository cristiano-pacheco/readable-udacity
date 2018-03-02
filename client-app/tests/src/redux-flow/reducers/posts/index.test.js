import { expect } from 'chai'
import deepFreeze from 'deep-freeze'
import posts from '../../../../../src/redux-flow/reducers/posts'
import * as actions from '../../../../../src/redux-flow/reducers/posts/actions'

const before = deepFreeze({
  columnSort: null,
  directionSort: null,
  postIDToDelete: null,
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
    type: actions.GET_POSTS,
    payload: [payload]
  })
  const after = {
    columnSort: null,
    directionSort: null,
    postIDToDelete: null,
    data: [payload]
  }
  expect(posts(before, action)).to.be.deep.equal(after)
})

it('should add a new post', () => {
  const action = deepFreeze({
    type: actions.ADD_POST,
    payload
  })
  const after = {
    columnSort: null,
    directionSort: null,
    postIDToDelete: null,
    data: [
      ...before.data,
      payload
    ]
  }
  expect(posts(before, action)).to.be.deep.equal(after)
})

it('should add one vote to the post', () => {
  const action = deepFreeze({
    type: actions.UP_VOTE,
    payload: 'id_default'
  })
  expect(posts(before, action).data[0].voteScore).to.be.equal(2)
})

it('should subtract one vote to the post', () => {
  const action = deepFreeze({
    type: actions.DOWN_VOTE,
    payload: 'id_default'
  })
  expect(posts(before, action).data[0].voteScore).to.be.equal(0)
})

it('should delete a post by id', () => {
  const action = deepFreeze({
    type: actions.DELETE_POST,
    payload: 'id_default'
  })
  const after = {
    columnSort: null,
    directionSort: null,
    postIDToDelete: null,
    data: []
  }
  expect(posts(before, action)).to.be.deep.equal(after)
})

it('should update the post', () => {
  const payload = {
    id: 'id_default',
    title: 'post_title_updated',
    body: 'body_post_updated',
    author: 'author_updated',
    category: 'category_updated'
  }
  const action = deepFreeze({
    type: actions.UPDATE_POST,
    payload
  })
  const after = {
    columnSort: null,
    directionSort: null,
    postIDToDelete: null,
    data: [payload]
  }
  expect(posts(before, action)).to.be.deep.equal(after)
})

it('should set the id of the post that should be deleted', () => {
  const action = deepFreeze({
    type: actions.OPEN_MODAL_DELETE_POST,
    payload: 'id'
  })
  const before = {
    columnSort: null,
    directionSort: null,
    postIDToDelete: null,
    data: []
  }
  const after = {
    columnSort: null,
    directionSort: null,
    postIDToDelete: 'id',
    data: []
  }
  expect(posts(before, action)).to.be.deep.equal(after)
})

it('should set the id of the post to be excluded to null', () => {
  const action = deepFreeze({
    type: actions.CLOSE_MODAL_DELETE_POST
  })
  const before = {
    columnSort: null,
    directionSort: null,
    postIDToDelete: 'id',
    data: []
  }
  const after = {
    columnSort: null,
    directionSort: null,
    postIDToDelete: null,
    data: []
  }
  expect(posts(before, action)).to.be.deep.equal(after)
})
