import React, { Component } from 'react'
import { connect } from 'react-redux'
import uuid from 'uuid/v4'
import { Segment, Header } from 'semantic-ui-react'

import PostForm from './form'
import * as PostFormValidator from '../validator'
import If from '../../../utils/components/if'
import ErrorMessage from '../../message/error'
import SuccessMessage from '../../message/success'
import { fetchCategories } from '../../../redux-flow/reducers/categories/action-creators'
import { addPostAPI } from '../../../redux-flow/reducers/posts/action-creators'

const initialState = {
  id: '',
  body: '',
  title: '',
  author: '',
  category: '',
  successMessage: '',
  isLoading: false,
  errorMessages: [],
}

class PostFormCreate extends Component {
  constructor () {
    super()
    this.state = initialState
    this.handleInputChange = this.handleInputChange.bind(this)
    this.handleSubmit = this.handleSubmit.bind(this)
  }

  componentDidMount () {
    this.props.fetchCategories()
  }

  handleSubmit (event) {
    event.preventDefault()
    this.setState({ isLoading: true })

    if (!this.formIsValid()) return

    const data = {
      ...this.state,
      id: uuid(),
      timestamp: Date.now()
    }

    this.props
      .addPostAPI(data)
      .then(() => {
        this.setState({
          ...initialState,
          successMessage: 'Post added.'
        })
      })
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

  handleInputChange (event, { name, value }) {
    this.setState({ [name]: value })
  }

  render () {
    const { errorMessages, successMessage, category,
      title, author, body, isLoading } = this.state
    return (
      <div>
        <Header as='h2' attached='top'>
          Create Post
        </Header>
        <Segment attached loading={isLoading}>
          <PostForm
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
  addPostAPI
}

export default connect(mapStateToProps, mapDispatchToProps)(PostFormCreate)
