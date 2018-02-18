import { sortBy } from 'lodash'
import createReducer from '../create-reducer'
import { GET_POSTS, ADD_POST, HANDLE_SORT } from './actions'

const initialState = {
  columnSort: null,
  directionSort: null,
  data: []
}

const posts = createReducer(initialState, {
  [GET_POSTS]: (state, action) => (
    {
      ...state,
      data: action.payload
    }
  ),
  [ADD_POST]: (state, action) => (
    {
      ...state,
      data: [
        ...state.data,
        action.payload
      ]
    }
  ),
  [HANDLE_SORT]: (state, action) => {
    const clickedColumn = action.payload

    if (state.columnSort !== clickedColumn) {
      return {
        columnSort: clickedColumn,
        data: sortBy(state.data, [clickedColumn]),
        directionSort: 'ascending'
      }
    }

    return {
      ...state,
      data: state.data.reverse(),
      directionSort: state.directionSort === 'ascending' ? 'descending' : 'ascending'
    }
  }
})

export default posts
