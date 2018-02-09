import React, { Component } from 'react'
import { Select } from 'semantic-ui-react'

import * as CategoriesAPI from '../../api/categories'
import * as PostsAPI from '../../api/posts'

import PostGrid from '../post/grid'

class Home extends Component {
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

    PostsAPI.getAll()
      .then(posts => {
        this.setState({ posts })
      })
  }

  render () {
    return (
      <div>
        <Select fluid placeholder='select the category' options={this.state.categories} />
        <PostGrid posts={this.state.posts} />
      </div>
    )
  }
}

export default Home
