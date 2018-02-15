import createReducer from '../create-reducer'
import { GET_POSTS, ADD_POST } from './actions'

const initialState = []

const posts = createReducer(initialState, {
  [GET_POSTS]: (state, action) => action.payload,
  [ADD_POST]: (state, action) => ([
    ...state,
    action.payload
  ])
})

export default posts
