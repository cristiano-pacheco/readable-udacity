export function removeSlash (string) {
  return string.replace('/', '')
}

export function captalize (string) {
  return string.charAt(0).toUpperCase() + string.slice(1)
}
