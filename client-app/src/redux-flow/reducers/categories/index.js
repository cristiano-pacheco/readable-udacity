import createReducer from '../create-reducer'
import { GET_CATEGORIES } from './actions'

const initialState = []

const categories = createReducer(initialState, {
  [GET_CATEGORIES]: (state, action) => action.payload.map(item => ({
    value: item.name,
    text: item.name
  }))
})

export default categories
