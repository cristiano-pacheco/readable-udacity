import SuccessMessage from '../../../../src/components/message/success'

describe('<SuccessMessage />', () => {
  it('shalow renders correctly', () => {
    expect(shallow(<SuccessMessage message='' />))
  })

  it('mounts correctly', () => {
    expect(mount(<SuccessMessage message='' />))
  })

  it('expects to render the message', () => {
    const wrapper = mount(<SuccessMessage message='message test' />)
    expect(wrapper.find('.header').text()).toBe('message test')
  })
})
