import { default as PostForm } from '../../../../../src/components/post/form/form'

const func = () => {}

describe('<PostForm />', () => {
  it('shalow renders correctly', () => {
    expect(shallow(<PostForm
      body=''
      title=''
      author=''
      category=''
      isLoading={false}
      categories={[]}
      handleSubmit={func}
      handleInputChange={func}
    />))
  })

  it('mount correctly', () => {
    expect(mount(<PostForm
      body=''
      title=''
      author=''
      category=''
      isLoading={false}
      categories={[]}
      handleSubmit={func}
      handleInputChange={func}
    />))
  })

  it('calls handleSubmit when the form is submited', () => {
    const handleSubmit = jest.fn()
    const wrapper = shallow(<PostForm
      body=''
      title=''
      author=''
      category=''
      isLoading={false}
      categories={[]}
      handleSubmit={handleSubmit}
      handleInputChange={func}
    />)

    wrapper.find('Form').simulate('submit')
    expect(handleSubmit).toHaveBeenCalledTimes(1)
  })

  it('calls handleInputChange when the input change', () => {
    const handleInputChange = jest.fn()
    const wrapper = shallow(<PostForm
      body=''
      title=''
      author=''
      category=''
      isLoading={false}
      categories={[]}
      handleSubmit={func}
      handleInputChange={handleInputChange}
    />)

    wrapper.find('FormInput').first().simulate('change')
    expect(handleInputChange).toHaveBeenCalledTimes(1)
  })
})
