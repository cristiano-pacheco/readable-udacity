import React, { Component } from 'react'
import { Select } from 'semantic-ui-react'
import { connect } from 'react-redux'
import uuid from 'uuid/v4'

import PostGrid from '../post/grid'
import PostForm from '../post/form'
import * as PostFormValidator from '../post/validator'
import { fetchCategories } from '../../redux-flow/reducers/categories/action-creators'
import { fetchPosts, savePost } from '../../redux-flow/reducers/posts/action-creators'

const initialState = {
  category: '',
  title: '',
  body: '',
  author: '',
  isLoading: false,
  showForm: false,
  errorMessages: [],
  successMessage: '',
  sort: {
    column: null,
    direction: null
  }
}

class Home extends Component {
  constructor () {
    super()
    this.state = initialState
    this.handleSubmitPostForm = this.handleSubmitPostForm.bind(this)
    this.handleInputChange = this.handleInputChange.bind(this)
    this.openForm = this.openForm.bind(this)
    this.closeForm = this.closeForm.bind(this)
  }

  componentDidMount () {
    this.props.fetchCategories()
    this.props.fetchPosts()
  }

  handleInputChange (event, { name, value }) {
    this.setState({ [name]: value })
  }

  handleSubmitPostForm (event) {
    event.preventDefault()
    this.setState({ isLoading: true })

    const errorMessages = PostFormValidator.validate(this.state)

    if (errorMessages.length) {
      this.setState({ errorMessages, isLoading: false })
      return
    } else {
      this.setState({ errorMessages })
    }

    const data = {
      ...this.state,
      id: uuid(),
      timestamp: Date.now()
    }

    this.props
      .savePost(data)
      .then(() => {
        setTimeout(() => {
          this.setState({
            ...initialState,
            showForm: true,
            successMessage: 'Post saved.'
          })
        }, 1000)

        setTimeout(() => {
          this.setState({
            successMessage: ''
          })
        }, 3500)
      })
  }

  closeForm () {
    this.setState(initialState)
  }

  openForm () {
    this.setState({ showForm: true })
  }

  render () {
    return (
      <div>
        <Select fluid placeholder='Select the Category' options={this.props.categories} />
        <br />
        <PostForm
          categories={this.props.categories}
          handleInputChange={this.handleInputChange}
          handleSubmit={this.handleSubmitPostForm}
          openForm={this.openForm}
          closeForm={this.closeForm}
          {...this.state}
        />
        <PostGrid posts={this.props.posts} />
      </div>
    )
  }
}

const mapStateToProps = state => ({
  categories: state.categories,
  posts: state.posts
})

const mapDispatchToProps = { fetchCategories, fetchPosts, savePost }

export default connect(mapStateToProps, mapDispatchToProps)(Home)
