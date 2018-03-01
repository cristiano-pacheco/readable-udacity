import React from 'react'
import PropTypes from 'prop-types'
import { Segment, Icon, Header, Button } from 'semantic-ui-react'

import If from '../../../utils/components/if'

const CommentsHeader = ({ comments, openForm, isLoading }) => (
  <Segment loading={isLoading}>
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
    <Button icon primary labelPosition='left' floated='right' onClick={openForm}>
      <Icon name='add' /> Add
    </Button>
  </Segment>
)

CommentsHeader.propTypes = {
  comments: PropTypes.array.isRequired,
  openForm: PropTypes.func.isRequired,
  isLoading: PropTypes.bool.isRequired
}

export default CommentsHeader
