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

export class Comments extends Component {
  constructor () {
    super()
    this.state = {
      id: '',
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
    this.openEditForm = this.openEditForm.bind(this)
    this.closeForm = this.closeForm.bind(this)
    this.handleInputChange = this.handleInputChange.bind(this)
    this.handleSubmit = this.handleSubmit.bind(this)
    this.deleteComment = this.deleteComment.bind(this)
    this.handleUpVote = this.handleUpVote.bind(this)
    this.handleDownVote = this.handleDownVote.bind(this)
  }

  componentDidMount () {
    const { post_id } = this.props.match.params
    this.setState({ isLoading: true })
    CommentsAPI
      .getAll(post_id)
      .then(comments => this.setState({ comments, postId: post_id, isLoading: false }))
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

    const data = this.getData()

    if (this.state.id) {
      return this.updateComment(data)
    }

    this.createComment(data)
  }

  createComment (data) {
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

  updateComment (data) {
    CommentsAPI
      .update(this.state.id, data)
      .then(comment => {
        this.setState({
          id: '',
          body: '',
          author: '',
          successMessage: 'Comment saved.',
          isLoading: false,
          comments: this.state.comments.map(item => {
            return item.id === comment.id ? comment : item
          })
        })
      })
  }

  getData () {
    const data = {
      id: uuid(),
      parentId: this.state.postId,
      author: this.state.author,
      body: this.state.body,
      timestamp: Date.now()
    }

    if (this.state.id) {
      delete data.id
      delete data.parentId
    }

    return data
  }

  deleteComment (id) {
    CommentsAPI
      .remove(id)
      .then(() => this.setState({
        comments: this.state.comments.filter(item => item.id !== id)
      }))
  }

  openForm () {
    this.setState({ isOpenForm: true })
  }

  openEditForm (commentId) {
    const { id, body, author } = this.state.comments.find(item => item.id === commentId)
    this.setState({
      ...this.state,
      id,
      body,
      author,
      isOpenForm: true
    })
  }

  closeForm () {
    this.setState({
      isOpenForm: false,
      successMessage: '',
      errorMessages: []
    })
  }

  handleUpVote (id) {
    CommentsAPI
      .upVote(id)
      .then(() => {
        const comments = this.state
        .comments
        .map(item => {
          if (item.id === id) {
            const voteScore = item.voteScore + 1
            return {
              ...item,
              voteScore
            }
          }
          return item
        })
        this.setState({ comments })
      })
  }

  handleDownVote (id) {
    CommentsAPI
      .downVote(id)
      .then(() => {
        const comments = this.state
        .comments
        .map(item => {
          if (item.id === id) {
            const voteScore = item.voteScore - 1
            return {
              ...item,
              voteScore
            }
          }
          return item
        })
        this.setState({ comments })
      })
  }

  render () {
    const { comments, isOpenForm, errorMessages, successMessage,
      body, author, isLoading } = this.state
    return (
      <div>
        <CommentsHeader
          comments={comments}
          isLoading={isLoading}
          openForm={this.openForm}
        />
        <br />
        <Card.Group itemsPerRow={1}>
          {comments.map((item, index) => (
            <Comment
              key={index}
              comment={item}
              openEditForm={this.openEditForm}
              deleteComment={this.deleteComment}
              handleUpVote={this.handleUpVote}
              handleDownVote={this.handleDownVote}
            />
          ))}
        </Card.Group>
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
      </div>
    )
  }
}

export default withRouter(Comments)
