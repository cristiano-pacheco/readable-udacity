import createReducer from '../create-reducer'
import { GET_POSTS } from './actions'

const initialState = []

const posts = createReducer(initialState, {
  [GET_POSTS]: (state, action) => action.payload
})

export default posts
