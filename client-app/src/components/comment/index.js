import React, { Component } from 'react'
import { withRouter } from 'react-router-dom'
import { Segment, Icon, Header, Button, Card } from 'semantic-ui-react'

import './comment.css'
import If from '../../utils/components/if'
import SingleComment from './single-comment'
import * as CommentsAPI from '../../api/comments'


class Comment extends Component {
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
        <Segment>
          <Header as='h2' className='header-comment'>
            <Icon name='comments' />
            <Header.Content>
              {comments.length}
              <If test={comments.length === 1}>
                &nbsp;Comment
              </If>
              <If test={comments.length === 0 || comments.length > 1}>
                &nbsp;Comments
              </If>
            </Header.Content>
          </Header>
          <Button icon labelPosition='left' primary floated='right'>
            <Icon name='add' /> Add
          </Button>
        </Segment>
        <Card.Group itemsPerRow={3}>
          {comments.map((item, index) => (
            <SingleComment key={index} comment={item} />
          ))}
        </Card.Group>
      </div>
    )
  }
}

export default withRouter(Comment)
