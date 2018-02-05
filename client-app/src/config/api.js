const api = 'http://localhost:3001'

let token = localStorage.token
if (!token) {
  token = localStorage.token = Math.random().toString(36).substr(-8)
}

const headers = {
  'Accept': 'application/json',
  'Authorization': token
}

export {
  api,
  token,
  headers
}
