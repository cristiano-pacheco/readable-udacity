import { api, headers } from '../config/api'

export const getAll = postId =>
  fetch(`${api}/posts/${postId}/comments`, { headers })
    .then(res => res.json())

export const store = data =>
  fetch(`${api}/comments`, {
    method: 'POST',
    headers: {
      ...headers,
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(data)
  })
  .then(res => res.json())

export const update = (id, data) =>
  fetch(`${api}/comments/${id}`, {
    method: 'PUT',
    headers: {
      ...headers,
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(data)
  })
  .then(res => res.json())
