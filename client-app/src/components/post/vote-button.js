import React from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { Icon } from 'semantic-ui-react'

import {
  upVoteAPI,
  downVoteAPI
} from '../../redux-flow/reducers/posts/action-creators'

const VoteButton = ({
  postId,
  upVoteAPI,
  downVoteAPI,
  handleUpVote,
  handleDownVote
}) => (
  <div>
    <Icon
      inverted
      circular
      color='blue'
      className='btn-pointer'
      name='thumbs outline up'
      onClick={() => {
        upVoteAPI(postId)
        handleUpVote()
      }}
    />
    <Icon
      inverted
      circular
      color='red'
      className='btn-pointer'
      name='thumbs outline down'
      onClick={() => {
        downVoteAPI(postId)
        handleDownVote()
      }}
    />
  </div>
)

VoteButton.propTypes = {
  postId: PropTypes.string.isRequired,
  upVoteAPI: PropTypes.func.isRequired,
  downVoteAPI: PropTypes.func.isRequired,
  handleUpVote: PropTypes.func,
  handleDownVote: PropTypes.func
}

VoteButton.defaultProps = {
  handleUpVote: () => {},
  handleDownVote: () => {}
}

const mapDispatchToProps = { upVoteAPI, downVoteAPI }

export default connect(null, mapDispatchToProps)(VoteButton)
