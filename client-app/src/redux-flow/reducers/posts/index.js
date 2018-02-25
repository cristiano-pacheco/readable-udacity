import { sortBy } from 'lodash'
import createReducer from '../create-reducer'
import * as actions from './actions'

const initialState = {
  columnSort: 'voteScore',
  directionSort: 'descending',
  data: []
}

const posts = createReducer(initialState, {
  [actions.GET_POSTS]: (state, action) => (
    {
      ...state,
      data: action.payload
    }
  ),
  [actions.ADD_POST]: (state, action) => (
    {
      ...state,
      data: [
        ...state.data,
        action.payload
      ]
    }
  ),
  [actions.HANDLE_SORT]: (state, action) => {
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
  },
  [actions.UP_VOTE]: (state, action) => {
    const posts = state.data.map(item => {
      if (item.id === action.payload) {
        return {
          ...item,
          voteScore: item.voteScore + 1
        }
      }
      return item
    })
    .sort((a, b) => {
      if (state.columnSort !== 'voteScore') {
        return 0
      }
      if (state.directionSort === 'descending') {
        return a.voteScore < b.voteScore
      }
      if (state.directionSort === 'ascending') {
        return a.voteScore > b.voteScore
      }
      return 0
    })

    return {
      ...state,
      data: posts
    }
  },
  [actions.DOWN_VOTE]: (state, action) => {
    const posts = state.data.map(item => {
      if (item.id === action.payload) {
        return {
          ...item,
          voteScore: item.voteScore - 1
        }
      }
      return item
    })
    .sort((a, b) => {
      if (state.columnSort !== 'voteScore') {
        return 0
      }
      if (state.directionSort === 'descending') {
        return a.voteScore < b.voteScore
      }
      if (state.directionSort === 'ascending') {
        return a.voteScore > b.voteScore
      }
      return 0
    })

    return {
      ...state,
      data: posts
    }
  },
  [actions.DELETE_POST]: (state, action) => ({
    ...state,
    data: state.data.filter(item => item.id !== action.payload)
  }),
  [actions.UPDATE_POST]: (state, action) => ({
    ...state,
    data: state.data.map(item => item.id === action.payload.id ? action.payload : item)
  })
})

export default posts
