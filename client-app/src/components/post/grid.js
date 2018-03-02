import React from 'react'
import PropTypes from 'prop-types'
import { Link } from 'react-router-dom'
import { Table, Icon } from 'semantic-ui-react'
import { connect } from 'react-redux'

import './post.css'
import If from '../../utils/components/if'
import DeletePost from './delete'
import VoteButton from './vote-button'
import { timeStampToHuman } from '../../utils/helpers/date'
import {
  handleSort,
  openModalDeletePost
} from '../../redux-flow/reducers/posts/action-creators'

const PostGrid = ({
  posts,
  sort,
  columnSort,
  deletePost
}) => (
  <div>
    <DeletePost />
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

        <If test={!posts.data.length}>
          <Table.Row>
            <Table.Cell colSpan={7}>
              No Posts Found.
            </Table.Cell>
          </Table.Row>
        </If>

        {!!posts.data.length && posts.data.map((item, index) => (
          <Table.Row key={index}>
            <Table.Cell textAlign='center' width={2}>
              <Link to={`/post/${item.id}/edit`}>
                <Icon color='blue' size='large' name='edit' />
              </Link>
              <Icon
                color='blue'
                size='large'
                name='trash'
                className='btn-pointer'
                onClick={() => deletePost(item.id)}
              />
            </Table.Cell>
            <Table.Cell>
              <Link to={`/${item.category}/${item.id}`}>
                {item.title}
              </Link>
            </Table.Cell>
            <Table.Cell textAlign='center' width={2}>
              {timeStampToHuman(item.timestamp)}
            </Table.Cell>
            <Table.Cell textAlign='center'>{item.author}</Table.Cell>
            <Table.Cell textAlign='center' width={1}>{item.commentCount}</Table.Cell>
            <Table.Cell textAlign='center' width={1}>{item.voteScore}</Table.Cell>
            <Table.Cell textAlign='center' width={2}>
              <VoteButton id={item.id} />
            </Table.Cell>
          </Table.Row>
        ))}
      </Table.Body>
    </Table>
  </div>
)

PostGrid.propTypes = {
  sort: PropTypes.func.isRequired,
  columnSort: PropTypes.func
}

const mapDispatchToProps = dispatch => ({
  sort: column => dispatch(handleSort(column)),
  deletePost: id => dispatch(openModalDeletePost(id))
})

export default connect(null, mapDispatchToProps)(PostGrid)
