import React, { Component } from 'react'
import { Select } from 'semantic-ui-react'
import { connect } from 'react-redux'
import uuid from 'uuid/v4'

import PostGrid from '../post/grid'
import PostForm from '../post/form'
import { getPost } from '../../api/posts'
import * as PostFormValidator from '../post/validator'
import { fetchCategories } from '../../redux-flow/reducers/categories/action-creators'
import { fetchPosts, savePost, updatePostAPI } from '../../redux-flow/reducers/posts/action-creators'

const initialState = {
  category: '',
  title: '',
  body: '',
  author: '',
  id: '',
  isLoading: false,
  showForm: false,
  isEditingPost: false,
  errorMessages: [],
  successMessage: ''
}

class Home extends Component {
  constructor () {
    super()
    this.state = initialState
    this.handleSubmitCreatePost = this.handleSubmitCreatePost.bind(this)
    this.handleSubmitUpdatePost = this.handleSubmitUpdatePost.bind(this)
    this.handleInputChange = this.handleInputChange.bind(this)
    this.openForm = this.openForm.bind(this)
    this.openEditForm = this.openEditForm.bind(this)
    this.closeForm = this.closeForm.bind(this)
    this.handleSuccessMessage = this.handleSuccessMessage.bind(this)
  }

  componentDidMount () {
    this.props.fetchCategories()
    this.props.fetchPosts()
  }

  handleInputChange (event, { name, value }) {
    this.setState({ [name]: value })
  }

  handleSubmitCreatePost (event) {
    event.preventDefault()
    this.setState({ isLoading: true })

    if (!this.formIsValid()) return

    const data = {
      ...this.state,
      id: uuid(),
      timestamp: Date.now()
    }

    this.props
      .savePost(data)
      .then(this.handleSuccessMessage)
  }

  handleSubmitUpdatePost (event) {
    event.preventDefault()
    this.setState({ isLoading: true })

    if (!this.formIsValid()) return

    const data = {
      category: this.state.category,
      title: this.state.title,
      body: this.state.body,
      author: this.state.author
    }

    this.props
      .updatePostAPI(this.state.id, data)
      .then(this.handleSuccessMessage)
  }

  formIsValid () {
    const errorMessages = PostFormValidator.validate(this.state)

    if (errorMessages.length) {
      this.setState({ errorMessages, isLoading: false })
      return false
    }

    this.setState({ errorMessages })
    return true
  }

  handleSuccessMessage () {
    let successMessage = {
      showForm: true,
      isLoading: false,
      successMessage: 'Post saved.'
    }

    if (!this.state.isEditingPost) {
      successMessage = {
        ...initialState,
        ...successMessage
      }
    }

    setTimeout(() => {
      this.setState(successMessage)
    }, 1000)

    setTimeout(() => {
      this.setState({
        successMessage: ''
      })
    }, 2000)
  }

  closeForm () {
    this.setState(initialState)
  }

  openForm () {
    this.setState({ showForm: true })
  }

  openEditForm (postId) {
    this.setState({ isLoading: true })
    getPost(postId)
      .then(post => {
        this.setState({
          ...this.state,
          ...post,
          showForm: true,
          isLoading: false,
          isEditingPost: true
        })
      })
  }

  render () {
    return (
      <div>
        <Select fluid placeholder='Select the Category' options={this.props.categories} />
        <br />
        <PostForm
          categories={this.props.categories}
          handleInputChange={this.handleInputChange}
          handleSubmit={this.state.isEditingPost ? this.handleSubmitUpdatePost : this.handleSubmitCreatePost}
          openForm={this.openForm}
          closeForm={this.closeForm}
          {...this.state}
        />
        <PostGrid
          posts={this.props.posts}
          openEditForm={this.openEditForm}
          closeForm={this.closeForm}
        />
      </div>
    )
  }
}

const mapStateToProps = state => ({
  categories: state.categories,
  posts: state.posts
})

const mapDispatchToProps = {
  fetchCategories,
  fetchPosts,
  savePost,
  updatePostAPI
}

export default connect(mapStateToProps, mapDispatchToProps)(Home)
