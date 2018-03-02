import React from 'react'
import PropTypes from 'prop-types'
import { Modal, Button, Form, Icon } from 'semantic-ui-react'

import If from '../../../../utils/components/if'
import ErrorMessage from '../../../message/error'
import SuccessMessage from '../../../message/success'

const CommentForm = ({
  open,
  body,
  close,
  author,
  isLoading,
  handleSubmit,
  errorMessages,
  successMessage,
  handleInputChange
}) => (
  <Modal open={open} size='small'>
    <Modal.Header>Comment Form</Modal.Header>
    <Modal.Content>
      <Modal.Description>
        <Form
          onSubmit={handleSubmit}
          loading={isLoading}
          autoComplete='off'
        >
          <Form.TextArea
            name='body'
            label='Body'
            rows={4}
            width={16}
            onChange={handleInputChange}
            value={body}
          />
          <Form.Input
            name='author'
            label='Author'
            width={16}
            onChange={handleInputChange}
            value={author}
          />
          <Button type='submit' disabled={isLoading} primary icon>
            <Icon name='save' /> Save
          </Button>
          <Button data-js='btn-close' disabled={isLoading} onClick={close} secondary icon>
            <Icon name='cancel' /> Close
          </Button>
        </Form>
        <If test={!!errorMessages.length}>
          <ErrorMessage errorMessages={errorMessages} />
        </If>
        <If test={!!successMessage.length}>
          <SuccessMessage message={successMessage} />
        </If>
      </Modal.Description>
    </Modal.Content>
  </Modal>
)

CommentForm.propTypes = {
  open: PropTypes.bool.isRequired,
  close: PropTypes.func.isRequired,
  author: PropTypes.string.isRequired,
  isLoading: PropTypes.bool.isRequired,
  handleSubmit: PropTypes.func.isRequired,
  errorMessages: PropTypes.array.isRequired,
  successMessage: PropTypes.string.isRequired,
  handleInputChange: PropTypes.func.isRequired
}

export default CommentForm
