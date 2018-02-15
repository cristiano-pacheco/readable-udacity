import React from 'react'
import PropTypes from 'prop-types'
import { Button, Modal, Form } from 'semantic-ui-react'



const PostForm = (props) => (
  <Modal
    size='small'
    trigger={<Button size='small' primary onClick={props.openForm}>Add Post</Button>}
    closeOnRootNodeClick={false}
    open={props.showForm}
  >
    <Modal.Header>Post Form</Modal.Header>
    <Modal.Content>
      <Modal.Description>
        <Form onSubmit={props.handleSubmit} loading={props.isLoading}>
          <Form.Select
            search
            label='Category'
            width={16}
            options={props.categories}
            onChange={props.handleInputChange}
            value={props.category}
            name='category'
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
      </Modal.Description>
    </Modal.Content>
  </Modal>
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
  closeForm: PropTypes.func.isRequired
}

export default PostForm
