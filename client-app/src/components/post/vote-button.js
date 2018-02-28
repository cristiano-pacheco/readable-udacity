import React from 'react'
import { connect } from 'react-redux'
import { Icon } from 'semantic-ui-react'

import { upVoteAPI, downVoteAPI } from '../../redux-flow/reducers/posts/action-creators'

const VoteButton = ({ postId, upVoteAPI, downVoteAPI }) => (
  <div>
    <Icon
      inverted
      circular
      color='blue'
      className='btn-pointer'
      name='thumbs outline up'
      onClick={() => upVoteAPI(postId)}
    />
    <Icon
      inverted
      circular
      color='red'
      className='btn-pointer'
      name='thumbs outline down'
      onClick={() => downVoteAPI(postId)}
    />
  </div>
)

const mapDispatchToProps = { upVoteAPI, downVoteAPI }

export default connect(null, mapDispatchToProps)(VoteButton)
