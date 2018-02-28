import * as PostAPI from '../../../api/posts'
import {
  GET_POSTS,
  ADD_POST,
  HANDLE_SORT,
  UP_VOTE,
  DOWN_VOTE,
  DELETE_POST,
  UPDATE_POST
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

export const fetchPostsByCategory = category => dispatch => (
  PostAPI
    .getPostsByCategory(category)
    .then(posts => dispatch(getPosts(posts)))
)

export const addPost = data => ({
  type: ADD_POST,
  payload: data
})

export const addPostAPI = data => dispatch => (
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

export const deletePost = id => ({
  type: DELETE_POST,
  payload: id
})

export const deletePostAPI = id => dispatch => (
  PostAPI
    .deletePost(id)
    .then(() => dispatch(deletePost(id)))
)

export const updatePost = data => ({
  type: UPDATE_POST,
  payload: data
})

export const updatePostAPI = (id, data) => dispatch => (
  PostAPI
    .updatePost(id, data)
    .then(post => dispatch(updatePost(post)))
)
