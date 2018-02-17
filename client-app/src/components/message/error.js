import React from 'react'
import PropTypes from 'prop-types'
import { Message } from 'semantic-ui-react'

const ErrorMessage = ({ errorMessages }) => (
  <Message error>
    {errorMessages.map((error, index) => (
      <Message.Item key={index}>{error}</Message.Item>
      ))}
  </Message>
)

ErrorMessage.propTypes = {
  errorMessages: PropTypes.array.isRequired
}

export default ErrorMessage
