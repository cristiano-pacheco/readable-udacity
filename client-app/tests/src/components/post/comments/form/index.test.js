import CommentForm from '../../../../../../src/components/post/comments/form'

const func = () => {}

describe('<CommentForm />', () => {
  it('shalow renders correctly', () => {
    expect(shallow(<CommentForm
      open={false}
      close={func}
      author=''
      isLoading={false}
      handleSubmit={func}
      errorMessages={[]}
      successMessage=''
      handleInputChange={func}
    />))
  })

  it('mount correctly', () => {
    expect(mount(<CommentForm
      open={false}
      close={func}
      author=''
      isLoading={false}
      handleSubmit={func}
      handleInputChange={func}
      errorMessages={[]}
      successMessage=''
    />))
  })

  it('calls handleSubmit when the form is submited', () => {
    const handleSubmit = jest.fn()
    const wrapper = shallow(<CommentForm
      open={false}
      close={func}
      author=''
      isLoading={false}
      handleSubmit={handleSubmit}
      handleInputChange={func}
      errorMessages={[]}
      successMessage=''
    />)

    wrapper.find('Form').simulate('submit')
    expect(handleSubmit).toHaveBeenCalledTimes(1)
  })

  it('calls handleInputChange when a input changes', () => {
    const handleInputChange = jest.fn()
    const wrapper = shallow(<CommentForm
      open={false}
      close={func}
      author=''
      isLoading={false}
      handleSubmit={func}
      errorMessages={[]}
      successMessage=''
      handleInputChange={handleInputChange}
    />)

    wrapper.find('FormInput').first().simulate('change')
    expect(handleInputChange).toHaveBeenCalledTimes(1)
  })

  it('calls close when a button close is clicked', () => {
    const close = jest.fn()
    const wrapper = shallow(<CommentForm
      open={false}
      close={close}
      author=''
      isLoading={false}
      handleSubmit={func}
      errorMessages={[]}
      successMessage=''
      handleInputChange={func}
    />)
    wrapper.find('Button[data-js="btn-close"]').simulate('click')
    expect(close).toHaveBeenCalledTimes(1)
  })
})
