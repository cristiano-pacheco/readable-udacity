import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import { connect } from 'react-redux'
import {
  Form,
  Segment,
  Header,
  Label,
  Icon,
  Message,
  Button,
  Statistic
} from 'semantic-ui-react'

import './post.css'
import DeletePost from './delete'
import VoteButton from './vote-button'
import Comments from './comments'
import { getPost } from '../../api/posts'
import { captalize } from '../../utils/helpers/string'
import {
  openModalDeletePost,
  fetchPosts
} from '../../redux-flow/reducers/posts/action-creators'

class Post extends Component {
  constructor () {
    super()
    this.state = {
      id: '',
      body: '',
      title: '',
      author: '',
      category: '',
      voteScore: 0,
      isLoading: false
    }
    this.handleUpVote = this.handleUpVote.bind(this)
    this.handleDownVote = this.handleDownVote.bind(this)
    this.goBack = this.goBack.bind(this)
  }

  componentDidMount () {
    this.setState({ isLoading: true })
    getPost(this.props.match.params.post_id)
      .then(post => {
        this.setState({ ...post, isLoading: false })
      })
  }

  handleUpVote () {
    this.setState({ voteScore: (this.state.voteScore + 1) })
  }

  handleDownVote () {
    this.setState({ voteScore: (this.state.voteScore - 1) })
  }

  goBack () {
    this.props.history.goBack()
  }

  render () {
    const { category, title, body, author, voteScore, isLoading } = this.state
    return (
      <div>
        <DeletePost />
        <Header as='h1' attached='top'>
          {title}
          <Label color='violet' tag className='tag-category'>
            {captalize(category)}
          </Label>
        </Header>
        <Segment attached loading={isLoading}>
          <Header as='h3' textAlign='left'>
            <Icon name='user' />{captalize(author)}
          </Header>
          <Statistic floated='right' size='small' className='vote-score'>
            <Statistic.Value>{voteScore}</Statistic.Value>
            <Statistic.Label>Votes</Statistic.Label>
          </Statistic>
          <Form>
            <Form.TextArea
              name='body'
              label='Body'
              rows={4}
              width={16}
              readOnly
              value={body}
              autoHeight
            />
          </Form>
        </Segment>
        <Message attached='bottom'>
          <Button icon labelPosition='left' primary onClick={this.goBack}>
            <Icon name='arrow left' /> Previous Page
          </Button>
          <Link to={`/post/${this.state.id}/edit`}>
            <Button icon labelPosition='left' primary>
              <Icon name='edit' /> Edit
            </Button>
          </Link>
          <Button
            icon
            labelPosition='left'
            color='red'
            onClick={() => this.props.deletePost(this.state.id)}
          >
            <Icon name='trash' /> Delete
          </Button>
          <div className='btn-vote-score'>
            <VoteButton
              postId={this.state.id}
              handleUpVote={this.handleUpVote}
              handleDownVote={this.handleDownVote}
            />
          </div>
        </Message>
        <Comments />
      </div>
    )
  }
}

const mapStateToProps = state => ({
  posts: state.posts
})

const mapDispatchToProps = dispatch => ({
  deletePost: id => dispatch(openModalDeletePost(id)),
  fetchPosts: () => dispatch(fetchPosts())
})

export default connect(mapStateToProps, mapDispatchToProps)(Post)
