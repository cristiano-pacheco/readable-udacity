import React from 'react'
import { withRouter } from 'react-router-dom'
import { connect } from 'react-redux'
import { Button, Header, Icon, Modal } from 'semantic-ui-react'

import {
  deletePostAPI,
  closeModalDeletePost
} from '../../redux-flow/reducers/posts/action-creators'

const PostDelete = withRouter(
    ({ history, postId, closeModal, deletePost }) => (
      <div>
        <Modal open={Boolean(postId)} basic size='small'>
          <Header icon='trash' content='Delete the Post' />
          <Modal.Content>
            <h3>Are you sure you want to delete the post?</h3>
          </Modal.Content>
          <Modal.Actions>
            <Button basic color='red' inverted onClick={closeModal}>
              <Icon name='remove' /> No
          </Button>
            <Button color='green' inverted onClick={() => {
              deletePost(postId)
              history.push('/')
              setTimeout(closeModal, 200)
            }}>
              <Icon name='checkmark' /> Yes
          </Button>
          </Modal.Actions>
        </Modal>
      </div>
  )
)

const mapStateToProps = state => ({
  postId: state.posts.postIDToDelete
})

const mapDispatchToProps = dispatch => ({
  closeModal: () => dispatch(closeModalDeletePost()),
  deletePost: postId => dispatch(deletePostAPI(postId))
})

export default connect(mapStateToProps, mapDispatchToProps)(PostDelete)
