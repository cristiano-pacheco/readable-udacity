import * as PostAPI from '../../../api/posts'
import { GET_POSTS, ADD_POST } from './actions'

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
