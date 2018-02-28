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
import VoteButton from './vote-button'
import { getPost } from '../../api/posts'
import { captalize } from '../../utils/helpers/string'

class Post extends Component {
  constructor () {
    super()
    this.state = {
      category: '',
      title: '',
      body: '',
      author: '',
      id: '',
      voteScore: 0
    }
    this.handleUpVote = this.handleUpVote.bind(this)
    this.handleDownVote = this.handleDownVote.bind(this)
    this.goBack = this.goBack.bind(this)
  }

  componentDidMount () {
    getPost(this.props.match.params.post_id)
      .then(post => {
        this.setState({ ...post })
      })
  }

  handleUpVote () {
    this.setState({ voteScore: (this.state.voteScore + 1) })
    this.props.upVoteAPI(this.state.id)
  }

  handleDownVote () {
    this.setState({ voteScore: (this.state.voteScore - 1) })
    this.props.downVoteAPI(this.state.id)
  }

  goBack () {
    this.props.history.goBack()
  }

  render () {
    const { category, title, body, author, voteScore } = this.state
    return (
      <div>
        <Header as='h1' attached='top'>
          {title}
          <Label color='violet' tag className='tag-category'>
            {captalize(category)}
          </Label>
        </Header>
        <Segment attached>

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
          <Button icon labelPosition='left' color='red'>
            <Icon name='trash' /> Delete
          </Button>
          <div className='btn-vote-score'>
            <VoteButton postId={this.state.id} />
          </div>
        </Message>
      </div>
    )
  }
}

const mapDispatchToProps = {}

export default connect(null, mapDispatchToProps)(Post)
