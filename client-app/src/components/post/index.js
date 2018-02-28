import React, { Component } from 'react'
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
import { getPost } from '../../api/posts'
import { captalize } from '../../utils/helpers/string'
import {
  upVoteAPI,
  downVoteAPI
} from '../../redux-flow/reducers/posts/action-creators'

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

          <Button basic icon labelPosition='left' primary>
            <Icon name='edit' /> Edit
          </Button>

          <Button basic icon labelPosition='left' color='red'>
            <Icon name='trash' /> Delete
          </Button>

          <Icon
            inverted
            circular
            color='red'
            className='btn-pointer btn-vote-score'
            name='thumbs outline down'
            onClick={this.handleDownVote}
          />

          <Icon
            inverted
            circular
            color='blue'
            className='btn-pointer btn-vote-score'
            name='thumbs outline up'
            onClick={this.handleUpVote}
          />

        </Message>
      </div>
    )
  }
}

const mapDispatchToProps = {
  upVoteAPI,
  downVoteAPI
}

export default connect(null, mapDispatchToProps)(Post)
