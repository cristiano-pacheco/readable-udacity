import * as PostAPI from '../../../api/posts'
import * as actions from './actions'

export const getPosts = data => ({
  type: actions.GET_POSTS,
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
  type: actions.ADD_POST,
  payload: data
})

export const addPostAPI = data => dispatch => (
  PostAPI
    .store(data)
    .then(post => dispatch(addPost(post)))
)

export const handleSort = column => ({
  type: actions.HANDLE_SORT,
  payload: column
})

export const upVote = id => ({
  type: actions.UP_VOTE,
  payload: id
})

export const downVote = id => ({
  type: actions.DOWN_VOTE,
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
  type: actions.DELETE_POST,
  payload: id
})

export const deletePostAPI = id => dispatch => (
  PostAPI
    .deletePost(id)
    .then(() => dispatch(deletePost(id)))
)

export const updatePost = data => ({
  type: actions.UPDATE_POST,
  payload: data
})

export const updatePostAPI = (id, data) => dispatch => (
  PostAPI
    .updatePost(id, data)
    .then(post => dispatch(updatePost(post)))
)

export const openModalDeletePost = postId => ({
  type: actions.OPEN_MODAL_DELETE_POST,
  payload: postId
})

export const closeModalDeletePost = () => ({
  type: actions.CLOSE_MODAL_DELETE_POST
})
