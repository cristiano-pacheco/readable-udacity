import React from 'react'
import { Form, Button } from 'semantic-ui-react'

const PostForm = ({
  handleSubmit,
  handleInputChange,
  isLoading,
  categories,
  category,
  title,
  body,
  author
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
    <Button type='submit' primary>Save</Button>
  </Form>
)

export default PostForm
