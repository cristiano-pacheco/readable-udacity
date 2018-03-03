import configureMockStore from 'redux-mock-store'
import thunk from 'redux-thunk'
import fetchMock from 'fetch-mock'

import * as actions from '../../../../../src/redux-flow/reducers/posts/actions'
import * as actionCreators from '../../../../../src/redux-flow/reducers/posts/action-creators'

const middlewares = [ thunk ]
const mockStore = configureMockStore(middlewares)

const initialState = {
  columnSort: 'voteScore',
  directionSort: 'descending',
  postIDToDelete: null,
  data: []
}

const post = {
  id: 'id_default',
  timestamp: Date.now(),
  title: 'post_title_default',
  body: 'body_post_default',
  author: 'author_default',
  category: 'category_default',
  voteScore: 1
}

describe('post actions', () => {
  afterEach(() => {
    fetchMock.reset()
    fetchMock.restore()
  })

  it('getPosts should dispatch a GET_POSTS action', () => {
    expect(actionCreators.getPosts([]))
      .toEqual({
        type: actions.GET_POSTS,
        payload: []
      })
  })

  it('fetchPosts should dispatch getPosts action creator', () => {
    const store = mockStore(initialState)

    const expectedAction = {
      type: actions.GET_POSTS,
      payload: [post]
    }

    fetchMock.get('*', [post])

    store.dispatch(actionCreators.fetchPosts())
      .then(() => {
        expect(store.getActions()).toEqual([expectedAction])
      })
  })

  it('fetchPostsByCategory should dispatch getPosts action creator', () => {
    const store = mockStore(initialState)

    const expectedAction = {
      type: actions.GET_POSTS,
      payload: [post]
    }

    fetchMock.get('*', [post])

    store.dispatch(actionCreators.fetchPostsByCategory('category'))
      .then(() => {
        expect(store.getActions()).toEqual([expectedAction])
      })
  })

  it('addPost should dispatch a ADD_POSTS action', () => {
    expect(actionCreators.addPost([{}]))
      .toEqual({
        type: actions.ADD_POST,
        payload: [{}]
      })
  })

  it('addPostAPI should dispatch ADD_POSTS action', () => {
    const store = mockStore(initialState)

    const expectedAction = {
      type: actions.ADD_POST,
      payload: post
    }

    fetchMock.post('*', post)

    store.dispatch(actionCreators.addPostAPI())
      .then(() => {
        expect(store.getActions()).toEqual([expectedAction])
      })
  })

  it('handleSort should dispatch HANDLE_SORT action', () => {
    expect(actionCreators.handleSort('title'))
      .toEqual({
        type: actions.HANDLE_SORT,
        payload: 'title'
      })
  })

  it('upVote should dispatch UP_VOTE action', () => {
    expect(actionCreators.upVote('id'))
      .toEqual({
        type: actions.UP_VOTE,
        payload: 'id'
      })
  })

  it('upVoteAPI should dispatch UP_VOTE action', () => {
    const store = mockStore(initialState)

    const expectedAction = {
      type: actions.UP_VOTE,
      payload: 'id'
    }

    fetchMock.post('*', {
      id: 'id'
    })

    store.dispatch(actionCreators.upVoteAPI('id'))
      .then(() => {
        expect(store.getActions()).toEqual([expectedAction])
      })
  })

  it('downVote should dispatch DOWN_VOTE action', () => {
    expect(actionCreators.downVote('id'))
      .toEqual({
        type: actions.DOWN_VOTE,
        payload: 'id'
      })
  })

  it('downVoteAPI should dispatch DOWN_VOTE action', () => {
    const store = mockStore(initialState)

    const expectedAction = {
      type: actions.DOWN_VOTE,
      payload: 'id'
    }

    fetchMock.post('*', {
      id: 'id'
    })

    store.dispatch(actionCreators.downVoteAPI('id'))
      .then(() => {
        expect(store.getActions()).toEqual([expectedAction])
      })
  })

  it('deletePost should dispatch DELETE_POST action', () => {
    expect(actionCreators.deletePost('id'))
      .toEqual({
        type: actions.DELETE_POST,
        payload: 'id'
      })
  })

  it('deletePostAPI should dispatch DELETE_POST action', () => {
    const store = mockStore(initialState)

    const expectedAction = {
      type: actions.DELETE_POST,
      payload: 'id'
    }

    fetchMock.delete('*', {
      id: 'id'
    })

    store.dispatch(actionCreators.deletePostAPI('id'))
      .then(() => {
        expect(store.getActions()).toEqual([expectedAction])
      })
  })

  it('updatePost should dispatch UPDATE_POST action', () => {
    expect(actionCreators.updatePost({}))
      .toEqual({
        type: actions.UPDATE_POST,
        payload: {}
      })
  })

  it('updatePostAPI should dispatch UPDATE_POST action', () => {
    const store = mockStore(initialState)

    const expectedAction = {
      type: actions.UPDATE_POST,
      payload: {}
    }

    fetchMock.put('*', {})

    store.dispatch(actionCreators.updatePostAPI('id', {}))
      .then(() => {
        expect(store.getActions()).toEqual([expectedAction])
      })
  })

  it('openModalDeletePost should dispatch OPEN_MODAL_DELETE_POST action', () => {
    expect(actionCreators.openModalDeletePost())
      .toEqual({
        type: actions.OPEN_MODAL_DELETE_POST
      })
  })

  it('closeModalDeletePost should dispatch CLOSE_MODAL_DELETE_POST action', () => {
    expect(actionCreators.closeModalDeletePost())
      .toEqual({
        type: actions.CLOSE_MODAL_DELETE_POST
      })
  })
})
