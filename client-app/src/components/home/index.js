import React, { Component } from 'react'
import { Select, Button } from 'semantic-ui-react'
import { connect } from 'react-redux'
import uuid from 'uuid/v4'

import PostGrid from '../post/grid'
import PostForm from '../post/form'
import { getPost } from '../../api/posts'
import * as PostFormValidator from '../post/validator'
import { removeSlash } from '../../utils/stringHelper'
import { fetchCategories } from '../../redux-flow/reducers/categories/action-creators'
import {
  fetchPosts,
  fetchPostsByCategory,
  savePost,
  updatePostAPI
} from '../../redux-flow/reducers/posts/action-creators'

const initialState = {
  category: '',
  title: '',
  body: '',
  author: '',
  id: '',
  isLoading: false,
  showForm: false,
  isEditingPost: false,
  blockCategory: false,
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
    this.clearCategory = this.clearCategory.bind(this)
  }

  componentDidMount () {
    this.props.fetchCategories()

    if (this.props.location.pathname === '/') {
      this.props.fetchPosts()
    } else {
      this.selectCategoryAfterPageRefresh()
    }

    this.persistCategoryAfterChangeRoute()
  }

  selectCategoryAfterPageRefresh () {
    const category = removeSlash(this.props.location.pathname)
    this.props.fetchPostsByCategory(category)
    this.setState({ category, blockCategory: true })
  }

  persistCategoryAfterChangeRoute () {
    this.props.history.listen(location => {
      if (location.pathname === '/') {
        return this.props.fetchPosts()
      }

      const category = removeSlash(location.pathname)
      this.setState({ category, blockCategory: true })
      this.props.fetchPostsByCategory(category)
    })
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

    this.props
      .updatePostAPI(this.state.id, this.getDataToUpdate())
      .then(this.handleSuccessMessage)
  }

  getDataToUpdate () {
    return {
      category: this.state.category,
      title: this.state.title,
      body: this.state.body,
      author: this.state.author
    }
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
    let successState = {
      showForm: true,
      isLoading: false,
      successMessage: 'Post saved.'
    }

    if (this.state.blockCategory) {
      successState.blockCategory = this.state.blockCategory
      successState.category = this.state.category
    }

    successState = {
      ...initialState,
      ...successState
    }

    setTimeout(() => {
      this.setState(successState)
    }, 1000)

    setTimeout(() => {
      this.setState({
        successMessage: ''
      })
    }, 2000)
  }

  closeForm () {
    const { blockCategory, category } = this.state
    this.setState({
      ...initialState,
      blockCategory: blockCategory || false,
      category: category || ''
    })
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

  handleCategoryChange (cateogry) {
    this.props.history.push(`/${cateogry}`)
  }

  clearCategory () {
    this.setState({ blockCategory: false, category: '' })
    this.props.history.push('/')
  }

  render () {
    return (
      <div>
        <Select
          fluid
          placeholder='Select the category'
          options={this.props.categories}
          onChange={(e, { value }) => this.handleCategoryChange(value)}
          value={this.state.category}
        />

        <br />

        {this.state.category !== '' && (
          <Button
            secondary
            floated='right'
            size='small'
            onClick={this.clearCategory}>
              Clear Category
          </Button>
        )}

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
  fetchPostsByCategory,
  savePost,
  updatePostAPI
}

export default connect(mapStateToProps, mapDispatchToProps)(Home)
