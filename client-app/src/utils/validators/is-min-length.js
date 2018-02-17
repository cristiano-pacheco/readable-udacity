const isMinLength = (value, minLength) => {
  if (value === undefined) {
    return true
  }
  if (typeof value === 'string') {
    return value.trim().length < minLength
  }
  return true
}

export default isMinLength
