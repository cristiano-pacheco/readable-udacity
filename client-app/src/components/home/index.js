import React, { PureComponent } from 'react'
import { Select } from 'semantic-ui-react'
import { connect } from 'react-redux'

import * as CategoriesAPI from '../../api/categories'
import * as PostsAPI from '../../api/posts'

import PostGrid from '../post/grid'
import { fetchPosts } from '../../redux-flow/reducers/posts/action-creators'

class Home extends PureComponent {
  constructor () {
    super()
    this.state = {
      categories: [],
      posts: []
    }
  }

  componentDidMount () {
    CategoriesAPI.getAll()
      .then(data => {
        const categories = data.map(item => ({
          value: item.name,
          text: item.name
        }))
        this.setState({ categories })
      })

    this.props.fetchPosts()
  }

  render () {
    return (
      <div>
        <Select fluid placeholder='select the category' options={this.state.categories} />
        <PostGrid posts={this.props.posts} />
      </div>
    )
  }
}

const mapStateToProps = state => ({
  posts: state.posts
})

const mapDispatchToProps = { fetchPosts }

export default connect(mapStateToProps, mapDispatchToProps)(Home)
