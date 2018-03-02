import { VoteButton } from '../../../../src/components/post/vote-button'

const func = () => {}

describe('<VoteButton />', () => {
  it('shalow renders correctly', () => {
    expect(shallow(<VoteButton id='' upVoteAPI={func} downVoteAPI={func} />))
  })

  it('mounts correctly', () => {
    expect(mount(<VoteButton id='' upVoteAPI={func} downVoteAPI={func} />))
  })

  it('calls upVoteAPI and handleUpVote on click UpVoteButton when typeVote=post', () => {
    const upVoteAPI = jest.fn()
    const handleUpVote = jest.fn()
    const wrapper = mount(<VoteButton
      id='id_test'
      typeVote='post'
      handleUpVote={handleUpVote}
      upVoteAPI={upVoteAPI}
      downVoteAPI={func}
    />)

    wrapper.find('i[data-js="btn-upvote"]').simulate('click')
    expect(upVoteAPI).toHaveBeenCalledTimes(1)
    expect(upVoteAPI).toHaveBeenCalledWith('id_test')
    expect(handleUpVote).toHaveBeenCalledTimes(1)
  })

  it('calls downVoteAPI and handleUpVote on click downVoteButton when typeVote=post', () => {
    const downVoteAPI = jest.fn()
    const handleDownVote = jest.fn()
    const wrapper = mount(<VoteButton
      id='id_test'
      typeVote='post'
      handleDownVote={handleDownVote}
      downVoteAPI={downVoteAPI}
      upVoteAPI={func}
    />)

    wrapper.find('i[data-js="btn-downvote"]').simulate('click')
    expect(downVoteAPI).toHaveBeenCalledTimes(1)
    expect(downVoteAPI).toHaveBeenCalledWith('id_test')
    expect(handleDownVote).toHaveBeenCalledTimes(1)
  })

  it('calls upVoteAPI and handleUpVote on click UpVoteButton when typeVote=VoteButton.typeVote.default', () => {
    const upVoteAPI = jest.fn()
    const handleUpVote = jest.fn()
    const wrapper = mount(<VoteButton
      id='id_test'
      handleUpVote={handleUpVote}
      upVoteAPI={upVoteAPI}
      downVoteAPI={func}
    />)

    wrapper.find('i[data-js="btn-upvote"]').simulate('click')
    expect(upVoteAPI).toHaveBeenCalledTimes(1)
    expect(upVoteAPI).toHaveBeenCalledWith('id_test')
    expect(handleUpVote).toHaveBeenCalledTimes(1)
  })

  it('calls downVoteAPI and handleUpVote on click downVoteButton when typeVote=VoteButton.typeVote.default', () => {
    const downVoteAPI = jest.fn()
    const handleDownVote = jest.fn()
    const wrapper = mount(<VoteButton
      id='id_test'
      typeVote='post'
      handleDownVote={handleDownVote}
      downVoteAPI={downVoteAPI}
      upVoteAPI={func}
    />)

    wrapper.find('i[data-js="btn-downvote"]').simulate('click')
    expect(downVoteAPI).toHaveBeenCalledTimes(1)
    expect(downVoteAPI).toHaveBeenCalledWith('id_test')
    expect(handleDownVote).toHaveBeenCalledTimes(1)
  })

  it('calls downVoteAPI and handleUpVote on click downVoteButton when typeVote=post', () => {
    const downVoteAPI = jest.fn()
    const handleDownVote = jest.fn()
    const wrapper = mount(<VoteButton
      id='id_test'
      typeVote='post'
      handleDownVote={handleDownVote}
      downVoteAPI={downVoteAPI}
      upVoteAPI={func}
    />)

    wrapper.find('i[data-js="btn-downvote"]').simulate('click')
    expect(downVoteAPI).toHaveBeenCalledTimes(1)
    expect(downVoteAPI).toHaveBeenCalledWith('id_test')
    expect(handleDownVote).toHaveBeenCalledTimes(1)
  })

  it('calls handleUpVote on click UpVoteButton when typeVote != post', () => {
    const upVoteAPI = jest.fn()
    const handleUpVote = jest.fn()
    const wrapper = mount(<VoteButton
      id='id_test'
      typeVote='comment'
      handleUpVote={handleUpVote}
      upVoteAPI={upVoteAPI}
      downVoteAPI={func}
    />)

    wrapper.find('i[data-js="btn-upvote"]').simulate('click')
    expect(upVoteAPI).toHaveBeenCalledTimes(0)
    expect(handleUpVote).toHaveBeenCalledTimes(1)
    expect(handleUpVote).toHaveBeenCalledWith('id_test')
  })

  it('calls handleDownVote on click DownVoteButton when typeVote != post', () => {
    const downVoteAPI = jest.fn()
    const handleDownVote = jest.fn()
    const wrapper = mount(<VoteButton
      id='id_test'
      typeVote='comment'
      handleDownVote={handleDownVote}
      downVoteAPI={downVoteAPI}
      upVoteAPI={func}
    />)

    wrapper.find('i[data-js="btn-downvote"]').simulate('click')
    expect(downVoteAPI).toHaveBeenCalledTimes(0)
    expect(handleDownVote).toHaveBeenCalledTimes(1)
    expect(handleDownVote).toHaveBeenCalledWith('id_test')
  })
})
