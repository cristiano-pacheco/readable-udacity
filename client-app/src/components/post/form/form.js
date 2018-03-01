import React from 'react'
import PropTypes from 'prop-types'
import { Form, Button, Icon } from 'semantic-ui-react'

const PostForm = ({
  body,
  title,
  author,
  category,
  isLoading,
  categories,
  handleSubmit,
  handleInputChange,
}) => (
  <Form
    onSubmit={handleSubmit}
    loading={isLoading}
    autoComplete='off'
  >
    <Form.Select
      search
      label='Category'
      width={16}
      options={categories}
      onChange={handleInputChange}
      value={category}
      name='category'
    />
    <Form.Input
      name='title'
      label='Title'
      width={16}
      onChange={handleInputChange}
      value={title}
    />
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
  </Form>
)

PostForm.propTypes = {
  body: PropTypes.string.isRequired,
  title: PropTypes.string.isRequired,
  author: PropTypes.string.isRequired,
  category: PropTypes.string.isRequired,
  isLoading: PropTypes.bool.isRequired,
  categories: PropTypes.array.isRequired,
  handleSubmit: PropTypes.func.isRequired,
  handleInputChange: PropTypes.func.isRequired
}

export default PostForm
