import React, { Component } from 'react'
import { withRouter } from 'react-router-dom'
import { Card } from 'semantic-ui-react'

import './comment.css'
import Comment from './comment'
import CommentsHeader from './comments-header'
import * as CommentsAPI from '../../../api/comments'


class Comments extends Component {
  constructor () {
    super()
    this.state = {
      comments: []
    }
  }

  componentDidMount () {
    const { post_id } = this.props.match.params
    CommentsAPI
      .getAll(post_id)
      .then(comments => this.setState({ comments }))
  }

  render () {
    const { comments } = this.state
    return (
      <div>
        <CommentsHeader comments={comments} />
        <Card.Group itemsPerRow={3}>
          {comments.map((item, index) => (
            <Comment key={index} comment={item} />
          ))}
        </Card.Group>
      </div>
    )
  }
}

export default withRouter(Comments)
