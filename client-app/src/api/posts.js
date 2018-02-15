import { api, headers } from '../config/api'

export const getAll = () =>
  fetch(`${api}/posts`, { headers })
    .then(res => res.json())

export const store = (data) =>
  fetch(`${api}/posts`, {
    method: 'POST',
    headers: {
      ...headers,
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(data)
  })
  .then(res => res.json())
