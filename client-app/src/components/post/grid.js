import React from 'react'
import PropTypes from 'prop-types'
import { Table, Icon } from 'semantic-ui-react'
import { connect } from 'react-redux'
import { handleSort, upVoteAPI, downVoteAPI, deletePostAPI } from '../../redux-flow/reducers/posts/action-creators'
import { timeStampToHuman } from '../../utils/dateHelper'
import './post.css'

const PostGrid = ({
  posts,
  sort,
  columnSort,
  upVote,
  downVote,
  deletePostAPI
}) => (
  <Table sortable compact celled selectable definition>
    <Table.Header>
      <Table.Row>
        <Table.HeaderCell />
        <Table.HeaderCell
          sorted={posts.columnSort === 'title' ? posts.directionSort : null}
          onClick={() => sort('title')}
        >
          Title
        </Table.HeaderCell>
        <Table.HeaderCell
          textAlign='center'
          sorted={posts.columnSort === 'timestamp' ? posts.directionSort : null}
          onClick={() => sort('timestamp')}
        >
          Date
        </Table.HeaderCell>
        <Table.HeaderCell
          textAlign='center'
          sorted={posts.columnSort === 'author' ? posts.directionSort : null}
          onClick={() => sort('author')}
        >
          Author
        </Table.HeaderCell>
        <Table.HeaderCell
          textAlign='center'
          sorted={posts.columnSort === 'commentCount' ? posts.directionSort : null}
          onClick={() => sort('commentCount')}
        >
          Comments
        </Table.HeaderCell>
        <Table.HeaderCell
          textAlign='center'
          sorted={posts.columnSort === 'voteScore' ? posts.directionSort : null}
          onClick={() => sort('voteScore')}
        >
          Vote Score
        </Table.HeaderCell>
        <Table.HeaderCell />
      </Table.Row>
    </Table.Header>
    <Table.Body>

      {!posts.data.length && (
        <Table.Row>
          <Table.Cell colSpan={7}>
            No Posts Found.
          </Table.Cell>
        </Table.Row>
      )}

      {!!posts.data.length && posts.data.map((item, index) => (
        <Table.Row key={index}>
          <Table.Cell textAlign='center' width={2}>
            <Icon
              color='blue'
              size='large'
              name='edit'
              className='btn-pointer'
            />
            <Icon
              color='blue'
              size='large'
              name='trash'
              className='btn-pointer'
              onClick={() => deletePostAPI(item.id)}
            />
          </Table.Cell>
          <Table.Cell>
            <a href=''>{item.title}</a>
          </Table.Cell>
          <Table.Cell textAlign='center' width={2}>
            {timeStampToHuman(item.timestamp)}
          </Table.Cell>
          <Table.Cell textAlign='center'>{item.author}</Table.Cell>
          <Table.Cell textAlign='center' width={1}>{item.commentCount}</Table.Cell>
          <Table.Cell textAlign='center' width={1}>{item.voteScore}</Table.Cell>
          <Table.Cell textAlign='center' width={2}>
            <Icon
              inverted
              circular
              color='blue'
              className='btn-pointer'
              name='thumbs outline up'
              onClick={() => upVote(item.id)}
            />
            <Icon
              inverted
              circular
              color='red'
              className='btn-pointer'
              name='thumbs outline down'
              onClick={() => downVote(item.id)}
            />
          </Table.Cell>
        </Table.Row>
      ))}
    </Table.Body>
  </Table>
)

PostGrid.propTypes = {
  sort: PropTypes.func.isRequired,
  columnSort: PropTypes.func,
  upVote: PropTypes.func.isRequired,
  downVote: PropTypes.func.isRequired,
  deletePostAPI: PropTypes.func.isRequired
}

const mapDispatchToProps = dispatch => ({
  sort: column => dispatch(handleSort(column)),
  upVote: id => dispatch(upVoteAPI(id)),
  downVote: id => dispatch(downVoteAPI(id)),
  deletePostAPI: id => dispatch(deletePostAPI(id))
})

export default connect(null, mapDispatchToProps)(PostGrid)
