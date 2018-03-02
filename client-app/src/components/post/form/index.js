import React, { Component } from 'react'
import { connect } from 'react-redux'
import uuid from 'uuid/v4'
import { Segment, Header } from 'semantic-ui-react'

import Form from './form'
import If from '../../../utils/components/if'
import ErrorMessage from '../../message/error'
import * as PostValidator from '../validator'
import SuccessMessage from '../../message/success'
import { getPost } from '../../../api/posts'
import { addPostAPI, updatePostAPI } from '../../../redux-flow/reducers/posts/action-creators'
import { fetchCategories } from '../../../redux-flow/reducers/categories/action-creators'


const initialState = {
  id: '',
  body: '',
  title: '',
  author: '',
  category: '',
  successMessage: '',
  isLoading: false,
  errorMessages: []
}

class PostForm extends Component {
  constructor () {
    super()
    this.state = initialState
    this.handleInputChange = this.handleInputChange.bind(this)
    this.handleSubmit = this.handleSubmit.bind(this)
  }

  componentDidMount () {
    this.props.fetchCategories()
    this.loadPost()
  }

  handleSubmit (event) {
    event.preventDefault()
    this.setState({ isLoading: true })

    if (!this.formIsValid()) return

    const data = this.getData()

    if (this.isEditing()) {
      return this.updatePost(data)
    }

    this.createPost(data)
  }

  formIsValid () {
    const errorMessages = PostValidator.validate(this.state)

    if (errorMessages.length) {
      this.setState({ errorMessages, isLoading: false })
      return false
    }

    this.setState({ errorMessages })
    return true
  }

  getData () {
    if (this.isEditing()) {
      return this.state
    }

    return {
      ...this.state,
      id: uuid(),
      timestamp: Date.now()
    }
  }

  updatePost (data) {
    this.props
      .updatePostAPI(this.state.id, this.state)
      .then(() => {
        this.setState({
          isLoading: false,
          successMessage: 'Post saved.'
        })
      })
  }

  createPost (data) {
    this.props
      .addPostAPI(data)
      .then(() => {
        this.setState({
          ...initialState,
          successMessage: 'Post added.'
        })
      })
  }

  loadPost () {
    const { post_id } = this.props.match.params
    if (post_id) {
      this.setState({ isLoading: true })
      getPost(post_id)
        .then(post => {
          this.setState({
            ...this.state,
            ...post,
            isLoading: false
          })
        })
    }
  }

  isEditing () {
    return !!this.state.id
  }

  handleInputChange (event, { name, value }) {
    this.setState({ [name]: value })
  }

  render () {
    const { id, errorMessages, successMessage, category,
      title, author, body, isLoading } = this.state
    return (
      <div>
        <Header as='h2' attached='top'>
          <If test={this.isEditing()}>
            Edit Post
          </If>
          <If test={!this.isEditing()}>
            Create Post
          </If>
        </Header>
        <Segment attached loading={isLoading}>
          <Form
            body={body}
            title={title}
            author={author}
            category={category}
            isLoading={isLoading}
            handleSubmit={this.handleSubmit}
            categories={this.props.categories}
            handleInputChange={this.handleInputChange}
          />
          <If test={!!errorMessages.length}>
            <ErrorMessage errorMessages={errorMessages} />
          </If>
          <If test={!!successMessage.length}>
            <SuccessMessage message={successMessage} />
          </If>
        </Segment>
      </div>
    )
  }
}

const mapStateToProps = state => ({
  categories: state.categories
})

const mapDispatchToProps = {
  fetchCategories,
  addPostAPI,
  updatePostAPI
}

export default connect(mapStateToProps, mapDispatchToProps)(PostForm)
