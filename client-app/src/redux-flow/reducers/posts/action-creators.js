import * as PostAPI from '../../../api/posts'
import { GET_POSTS } from './actions'

export const getPosts = data => ({
  type: GET_POSTS,
  payload: data
})

export const fetchPosts = () => dispatch => (
  PostAPI
    .getAll()
    .then(posts => dispatch(getPosts(posts)))
)
