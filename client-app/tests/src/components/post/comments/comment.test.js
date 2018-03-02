import Comment from '../../../../../src/components/post/comments/comment'

const func = () => {}

const comment = {
  id:'id_test',
  body: '',
  author: '',
  timestamp: '',
  voteScore: 0
}

describe('<Comment />', () => {
  it('shalow renders correctly', () => {
    expect(shallow(<Comment
      comment={comment}
      openEditForm={func}
      deleteComment={func}
      handleUpVote={func}
      handleDownVote={func}
    />))
  })

  it('calls openEditForm when the button Edit is clicked', () => {
    const openEditForm = jest.fn()
    const wrapper = shallow(<Comment
      comment={comment}
      openEditForm={openEditForm}
      deleteComment={func}
      handleUpVote={func}
      handleDownVote={func}
    />)

    wrapper.find('Button[data-js="btn-edit"]').simulate('click')
    expect(openEditForm).toHaveBeenCalledTimes(1)
    expect(openEditForm).toHaveBeenCalledWith(comment.id)
  })

  it('calls openEditForm when the button Edit is clicked', () => {
    const deleteComment = jest.fn()
    const wrapper = shallow(<Comment
      comment={comment}
      openEditForm={func}
      deleteComment={deleteComment}
      handleUpVote={func}
      handleDownVote={func}
    />)

    wrapper.find('Button[data-js="btn-delete"]').simulate('click')
    expect(deleteComment).toHaveBeenCalledTimes(1)
    expect(deleteComment).toHaveBeenCalledWith(comment.id)
  })

  it('should set the color of the vote score to blue when comment.voteScore >= 0 ', () => {
    const wrapper = shallow(<Comment
      comment={comment}
      openEditForm={func}
      deleteComment={func}
      handleUpVote={func}
      handleDownVote={func}
    />)
    expect(wrapper.find('Button[data-js="btn-vote-score"]').prop('color')).toBe('blue')
  })

  it('should set the color of the vote score to red when comment.voteScore < 0 ', () => {
    comment.voteScore = -1
    const wrapper = shallow(<Comment
      comment={comment}
      openEditForm={func}
      deleteComment={func}
      handleUpVote={func}
      handleDownVote={func}
    />)
    expect(wrapper.find('Button[data-js="btn-vote-score"]').prop('color')).toBe('red')
  })
})
