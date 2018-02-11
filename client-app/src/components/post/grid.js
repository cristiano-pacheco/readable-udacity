import React from 'react'
import { Table } from 'semantic-ui-react'

const PostGrid = ({ posts }) => (
  <Table color='blue' compact celled selectable>
    <Table.Header>
      <Table.Row>
        <Table.HeaderCell>Title</Table.HeaderCell>
        <Table.HeaderCell>Author</Table.HeaderCell>
        <Table.HeaderCell textAlign='center'>Vote Score</Table.HeaderCell>
      </Table.Row>
    </Table.Header>
    <Table.Body>
      { posts.map((item, index) => (
        <Table.Row key={index}>
          <Table.Cell>
            <a href=''>{item.title}</a>
          </Table.Cell>
          <Table.Cell>{item.author}</Table.Cell>
          <Table.Cell textAlign='center' width={2}>{item.voteScore}</Table.Cell>
        </Table.Row>
      ))}
    </Table.Body>
  </Table>
)

export default PostGrid
