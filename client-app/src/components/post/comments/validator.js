import isEmpty from '../../../utils/validators/is-empty'
import isMinLength from '../../../utils/validators/is-min-length'

let errorMessages = []

const requiredAndIsMinLength = (value, name, minLength) => {
  if (isEmpty(value)) {
    return errorMessages.push(`The ${name} field is required.`)
  }
  if (isMinLength(value, minLength)) {
    return errorMessages.push(`The ${name} must be at least ${minLength} characters.`)
  }
}

export const validate = (fields) => {
  errorMessages = []

  requiredAndIsMinLength(fields.body, 'Body', 5)
  requiredAndIsMinLength(fields.author, 'Author', 3)

  return errorMessages
}
