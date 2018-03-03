import fetchMock from 'fetch-mock'
import { shallowToJson } from 'enzyme-to-json'
import { Comments } from '../../../../../src/components/post/comments'

const match = {
  params: {
    post_id: 'id'
  }
}

describe('<Comments />', () => {
  afterEach(() => {
    fetchMock.reset()
    fetchMock.restore()
  })

  it('shalow renders correctly', () => {
    fetchMock.get('*', [])
    const wrapper = shallow(<Comments match={match} />)
    expect(shallowToJson(wrapper)).toMatchSnapshot()
  })

  it('mount correctly', () => {
    fetchMock.get('*', [])
    expect(mount(<Comments match={match} />))
  })

  it('should map comments and render a comment for each one of them', () => {
    fetchMock.get('*', [])
    const comments = [{},{}]
    const wrapper = shallow(<Comments match={match} />)
    wrapper.setState({ comments })
    expect(wrapper.find('Comment').length).toBe(2)
  })
})
