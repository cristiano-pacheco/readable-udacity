import React from 'react'
import { Segment, Icon, Header, Button } from 'semantic-ui-react'

import If from '../../../utils/components/if'

const CommentsHeader = ({ comments }) => (
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
)

export default CommentsHeader
