import React from 'react'
import { Card, Icon, Button, Label } from 'semantic-ui-react'

import If from '../../../utils/components/if'
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
        Matthew is a musician living in Nashville.
      </Card.Description>
    </Card.Content>
    <Card.Content extra>
      <Button as='div' labelPosition='right'>
        <Button color={comment.voteScore < 0 ? 'red' : 'blue' } size='mini'>
          <Icon name='heart' />
          Votes
        </Button>
        <Label as='a' basic color={comment.voteScore < 0 ? 'red' : 'blue' } pointing='left'>
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

export default Comment
