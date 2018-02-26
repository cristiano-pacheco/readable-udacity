import React from 'react'
import PropTypes from 'prop-types'
import { Button, Modal, Form } from 'semantic-ui-react'
import ErrorMessage from '../message/error'
import SuccessMessage from '../message/success'

const PostForm = (props) => (
  <div>
    <Modal
      size='small'
      trigger={<Button size='small' primary onClick={props.openForm}>Add Post</Button>}
      closeOnRootNodeClick={false}
      open={props.showForm}
    >
      <Modal.Header>Post Form</Modal.Header>
      <Modal.Content>
        <Modal.Description>
          <Form
            onSubmit={props.handleSubmit}
            loading={props.isLoading}
            autoComplete='off'
          >
            <Form.Select
              search
              label='Category'
              width={16}
              options={props.categories}
              onChange={props.handleInputChange}
              value={props.category}
              name='category'
              disabled={props.blockCategory}
            />
            <Form.Input
              name='title'
              label='Title'
              width={16}
              onChange={props.handleInputChange}
              value={props.title}
            />
            <Form.TextArea
              name='body'
              label='Body'
              rows={4}
              width={16}
              onChange={props.handleInputChange}
              value={props.body}
            />
            <Form.Input
              name='author'
              label='Author'
              width={16}
              onChange={props.handleInputChange}
              value={props.author}
            />
            <Button type='submit' primary>Save</Button>
            <Button secondary onClick={props.closeForm}>Close</Button>
          </Form>
          {!!props.errorMessages.length &&
            <ErrorMessage errorMessages={props.errorMessages} />
          }

          {!!props.successMessage.length &&
            <SuccessMessage message={props.successMessage} />
          }
        </Modal.Description>
      </Modal.Content>
    </Modal>
  </div>
)

PostForm.propTypes = {
  categories: PropTypes.array.isRequired,
  handleInputChange: PropTypes.func.isRequired,
  handleSubmit: PropTypes.func.isRequired,
  isLoading: PropTypes.bool.isRequired,
  author: PropTypes.string.isRequired,
  category: PropTypes.string.isRequired,
  title: PropTypes.string.isRequired,
  body: PropTypes.string.isRequired,
  showForm: PropTypes.bool.isRequired,
  closeForm: PropTypes.func.isRequired,
  errorMessages: PropTypes.array.isRequired,
  successMessage: PropTypes.string.isRequired
}

export default PostForm
