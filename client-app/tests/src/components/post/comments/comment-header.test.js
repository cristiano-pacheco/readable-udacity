import CommentsHeader from '../../../../../src/components/post/comments/comments-header'

const func = () => {}

describe('<CommentHeader />', () => {
  it('shalow renders correctly', () => {
    expect(shallow(<CommentsHeader
      comments={[]}
      openForm={func}
      isLoading={false}
    />))
  })

  it('mount correctly', () => {
    expect(mount(<CommentsHeader
      comments={[]}
      openForm={func}
      isLoading={false}
    />))
  })

  it('calls openEditForm when the button Edit is clicked', () => {
    const openForm = jest.fn()
    const wrapper = shallow(<CommentsHeader
      comments={[]}
      openForm={openForm}
      isLoading={false}
    />)

    wrapper.find('Button').simulate('click')
    expect(openForm).toHaveBeenCalledTimes(1)
  })

  it('shows the word Comment when the array of comment has only one element.', () => {
    const wrapper = mount(<CommentsHeader
      comments={[{}]}
      openForm={func}
      isLoading={false}
    />)

    expect(wrapper.find('span[data-js="text-comment"]').text().trim()).toBe('Comment')
  })

  it('shows the word Comments when the array of comments has zero elements.', () => {
    const wrapper = mount(<CommentsHeader
      comments={[]}
      openForm={func}
      isLoading={false}
    />)

    expect(wrapper.find('span[data-js="text-comments"]').text().trim()).toBe('Comments')
  })

  it('shows the word Comments when the array of comments has one element.', () => {
    const wrapper = mount(<CommentsHeader
      comments={[{},{}]}
      openForm={func}
      isLoading={false}
    />)

    expect(wrapper.find('span[data-js="text-comments"]').text().trim()).toBe('Comments')
  })
})
