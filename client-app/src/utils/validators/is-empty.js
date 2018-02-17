const isEmpty = value => {
  if (value === undefined) {
    return true
  }
  if (typeof value === 'string') {
    return value.trim().length === 0
  }
}

export default isEmpty
