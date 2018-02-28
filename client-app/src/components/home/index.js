import React, { Component } from 'react'
import { Select, Button } from 'semantic-ui-react'
import { connect } from 'react-redux'

import If from '../../utils/components/if'
import PostGrid from '../post/grid'
import { removeSlash } from '../../utils/helpers/string'
import { fetchCategories } from '../../redux-flow/reducers/categories/action-creators'
import {
  fetchPosts,
  fetchPostsByCategory
} from '../../redux-flow/reducers/posts/action-creators'

class Home extends Component {
  constructor () {
    super()
    this.state = {
      category: '',
      unlisten: null
    }
    this.openNewPostForm = this.openNewPostForm.bind(this)
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
    const unlisten = this.props.history.listen(location => {
      if (location.pathname === '/') {
        return this.props.fetchPosts()
      }

      const category = removeSlash(location.pathname)
      this.setState({ category, blockCategory: true })
      this.props.fetchPostsByCategory(category)
    })

    unlisten()
  }

  handleCategoryChange (category) {
    this.setState({ category })
    this.props.history.push(`/${category}`)
  }

  openNewPostForm () {
    this.props.history.push('/post/new')
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

        <Button primary size='small' onClick={this.openNewPostForm}>Add Post</Button>

        <If test={this.state.category !== ''}>
          <Button
            secondary
            floated='right'
            size='small'
            onClick={this.clearCategory}>
              Clear Category
          </Button>
        </If>

        <PostGrid posts={this.props.posts} />
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
  fetchPostsByCategory
}

export default connect(mapStateToProps, mapDispatchToProps)(Home)
