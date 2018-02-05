import React, { Component } from 'react'
import { Select } from 'semantic-ui-react'

import * as CategoriesAPI from '../../api/categories'

class Home extends Component {
  constructor () {
    super()
    this.state = {
      categories: []
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
  }

  render () {
    return (
      <Select fluid placeholder='select the category' options={this.state.categories} />
    )
  }
}

export default Home
