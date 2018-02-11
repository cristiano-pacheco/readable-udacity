import React, { PureComponent } from 'react'
import { Select } from 'semantic-ui-react'
import { connect } from 'react-redux'

import PostGrid from '../post/grid'
import { fetchCategories } from '../../redux-flow/reducers/categories/action-creators'
import { fetchPosts } from '../../redux-flow/reducers/posts/action-creators'

class Home extends PureComponent {
  componentDidMount () {
    this.props.fetchCategories()
    this.props.fetchPosts()
  }

  render () {
    return (
      <div>
        <Select
          fluid
          placeholder='select the category'
          options={this.props.categories}
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

const mapDispatchToProps = { fetchCategories, fetchPosts }

export default connect(mapStateToProps, mapDispatchToProps)(Home)
