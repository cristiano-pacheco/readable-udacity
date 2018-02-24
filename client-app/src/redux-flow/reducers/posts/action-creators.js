import * as PostAPI from '../../../api/posts'
import {
  GET_POSTS,
  ADD_POST,
  HANDLE_SORT,
  UP_VOTE,
  DOWN_VOTE
} from './actions'

export const getPosts = data => ({
  type: GET_POSTS,
  payload: data
})

export const fetchPosts = () => dispatch => (
  PostAPI
    .getAll()
    .then(posts => dispatch(getPosts(posts)))
)

export const addPost = data => ({
  type: ADD_POST,
  payload: data
})

export const savePost = data => dispatch => (
  PostAPI
    .store(data)
    .then(post => dispatch(addPost(post)))
)

export const handleSort = column => ({
  type: HANDLE_SORT,
  payload: column
})

export const upVote = id => ({
  type: UP_VOTE,
  payload: id
})

export const downVote = id => ({
  type: DOWN_VOTE,
  payload: id
})

export const upVoteAPI = id => dispatch => (
  PostAPI
    .upVote(id)
    .then(post => dispatch(upVote(post.id)))
)

export const downVoteAPI = id => dispatch => (
  PostAPI
    .downVote(id)
    .then(post => dispatch(downVote(post.id)))
)
