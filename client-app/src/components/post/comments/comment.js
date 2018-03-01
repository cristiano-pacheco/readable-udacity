import React from 'react'
import PropTypes from 'prop-types'
import { Card, Icon, Button, Label } from 'semantic-ui-react'

import VoteButtom from '../../post/vote-button'
import { timeStampToNow } from '../../../utils/helpers/date'

const Comment = ({ comment }) => (
  <Card>
    <Card.Content>
      <Card.Header>
        {comment.author}
      </Card.Header>
      <Card.Meta>
        <span className='date'>
          {timeStampToNow(comment.timestamp)}
        </span>
      </Card.Meta>
      <Card.Description>
        {comment.body}
      </Card.Description>
    </Card.Content>
    <Card.Content extra>
      <Button as='div' labelPosition='right'>
        <Button color={comment.voteScore < 0 ? 'red' : 'blue'} size='mini'>
          <Icon name='heart' />
          Votes
        </Button>
        <Label as='a' basic color={comment.voteScore < 0 ? 'red' : 'blue'} pointing='left'>
          {comment.voteScore}
        </Label>
      </Button>
      <div style={{ float: 'right' }}>
        <VoteButtom />
      </div>
    </Card.Content>
    <Button.Group attached='bottom'>
      <Button>
        <Icon name='edit' />
        Edit
      </Button>
      <Button>
        <Icon name='trash' />
        Delete
      </Button>
    </Button.Group>
  </Card>
)

Comment.propTypes = {
  comment: PropTypes.object.isRequired
}

export default Comment
