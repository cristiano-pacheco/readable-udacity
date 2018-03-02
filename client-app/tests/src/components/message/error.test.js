import ErrorMessage from '../../../../src/components/message/error'

describe('<SuccessMessage />', () => {
  it('shalow renders correctly', () => {
    expect(shallow(<ErrorMessage errorMessages={[]} />))
  })

  it('mounts correctly', () => {
    expect(mount(<ErrorMessage errorMessages={[]} />))
  })

  it('expects to map an array of messages and creates a li tag for each one of them', () => {
    const messages = ['error', 'error 2', 'error3']
    const wrapper = mount(<ErrorMessage errorMessages={messages} />)
    expect(wrapper.find('li').length).toBe(3)
  })
})
