import { api, headers } from '../config/api'

export const getAll = () =>
  fetch(`${api}/posts`, { headers })
    .then(res => res.json())
