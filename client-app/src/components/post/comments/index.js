import React, { Component } from 'react'
import { withRouter } from 'react-router-dom'
import { Card } from 'semantic-ui-react'
import uuid from 'uuid/v4'

import './comment.css'
import Comment from './comment'
import CommentForm from './form'
import CommentsHeader from './comments-header'
import * as CommentValidator from './validator'
import * as CommentsAPI from '../../../api/comments'

class Comments extends Component {
  constructor () {
    super()
    this.state = {
      body: '',
      author: '',
      postId: '',
      successMessage: '',
      isLoading: false,
      isOpenForm: false,
      comments: [],
      errorMessages: []
    }
    this.openForm = this.openForm.bind(this)
    this.closeForm = this.closeForm.bind(this)
    this.handleInputChange = this.handleInputChange.bind(this)
    this.handleSubmit = this.handleSubmit.bind(this)
  }

  componentDidMount () {
    const { post_id } = this.props.match.params
    CommentsAPI
      .getAll(post_id)
      .then(comments => this.setState({ comments, postId: post_id }))
  }

  handleInputChange (event, { name, value }) {
    this.setState({ [name]: value })
  }

  handleSubmit (event) {
    event.preventDefault()
    this.setState({ isLoading: true })

    const errorMessages = CommentValidator.validate(this.state)

    if (errorMessages.length) {
      this.setState({ errorMessages, isLoading: false })
      return
    } else {
      this.setState({ errorMessages })
    }

    const data = {
      id: uuid(),
      parentId: this.state.postId,
      author: this.state.author,
      body: this.state.body,
      timestamp: Date.now()
    }

    CommentsAPI
      .store(data)
      .then(comment => {
        this.setState({
          body: '',
          author: '',
          successMessage: 'Comment saved.',
          isLoading: false,
          comments: [
            ...this.state.comments,
            comment
          ]
        })
      })
  }

  openForm () {
    this.setState({ isOpenForm: true })
  }

  closeForm () {
    this.setState({ isOpenForm: false })
  }

  render () {
    const { comments, isOpenForm, errorMessages, successMessage,
      body, author, isLoading } = this.state
    return (
      <div>
        <CommentForm
          body={body}
          author={author}
          open={isOpenForm}
          isLoading={isLoading}
          close={this.closeForm}
          errorMessages={errorMessages}
          successMessage={successMessage}
          handleSubmit={this.handleSubmit}
          handleInputChange={this.handleInputChange}
        />
        <CommentsHeader
          comments={comments}
          isLoading={isLoading}
          openForm={this.openForm}
        />
        <br />
        <Card.Group itemsPerRow={3}>
          {comments.map((item, index) => (
            <Comment key={index} comment={item} />
          ))}
        </Card.Group>
      </div>
    )
  }
}

export default withRouter(Comments)
