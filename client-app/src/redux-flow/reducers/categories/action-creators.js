import * as CategoriesAPI from '../../../api/categories'
import { GET_CATEGORIES } from './actions'

export const getCategories = data => ({
  type: GET_CATEGORIES,
  payload: data
})

export const fetchCategories = () => dispatch => (
  CategoriesAPI
    .getAll()
    .then(data => dispatch(getCategories(data)))
)
