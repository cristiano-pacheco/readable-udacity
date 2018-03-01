import { api, headers } from '../config/api'

export const getAll = postId =>
  fetch(`${api}/posts/${postId}/comments`, { headers })
    .then(res => res.json())
