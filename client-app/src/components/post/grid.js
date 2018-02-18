import React from 'react'
import { Table } from 'semantic-ui-react'
import { connect } from 'react-redux'
import { handleSort } from '../../redux-flow/reducers/posts/action-creators'
import { timeStampToHuman } from '../../utils/dateHelper'

const PostGrid = ({ posts, sort, columnSort }) => (
  <Table color='blue' sortable compact celled selectable>
    <Table.Header>
      <Table.Row>
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
          sorted={posts.columnSort === 'author' ? posts.directionSort : null}
          onClick={() => sort('author')}
        >
          Author
        </Table.HeaderCell>
        <Table.HeaderCell
          textAlign='center'
          sorted={posts.columnSort === 'voteScore' ? posts.directionSort : null}
          onClick={() => sort('voteScore')}
        >
          Vote Score
        </Table.HeaderCell>
      </Table.Row>
    </Table.Header>
    <Table.Body>
      { posts.data.map((item, index) => (
        <Table.Row key={index}>
          <Table.Cell>
            <a href=''>{item.title}</a>
          </Table.Cell>
          <Table.Cell textAlign='center'>
            {timeStampToHuman(item.timestamp)}
          </Table.Cell>
          <Table.Cell>{item.author}</Table.Cell>
          <Table.Cell textAlign='center' width={2}>{item.voteScore}</Table.Cell>
        </Table.Row>
      ))}
    </Table.Body>
  </Table>
)

const mapDispatchToProps = dispatch => ({
  sort: column => dispatch(handleSort(column))
})

export default connect(null, mapDispatchToProps)(PostGrid)
