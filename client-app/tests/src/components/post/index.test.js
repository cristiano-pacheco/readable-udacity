import fetchMock from 'fetch-mock'
import { shallowToJson } from 'enzyme-to-json'
import { Post } from '../../../../src/components/post'

const match = {
  params: {
    post_id: ''
  }
}

describe('<Post />', () => {
  afterEach(() => {
    fetchMock.reset()
    fetchMock.restore()
  })

  it('shalow renders correctly', () => {
    fetchMock.get('*', [])
    const wrapper = shallow(<Post match={match} />)
    expect(shallowToJson(wrapper)).toMatchSnapshot()
  })

  it('calls deletePost when delete button is clicked', () => {
    const deletePost = jest.fn()
    fetchMock.get('*', [])

    const wrapper = shallow(<Post match={match} deletePost={deletePost} />)

    wrapper.setState({ id: 'id' })

    wrapper.find('Button[data-js="btn-delete"]').simulate('click')

    expect(deletePost).toHaveBeenCalledTimes(1)
    expect(deletePost).toHaveBeenCalledWith('id')
  })

  it('show the word Votes when voteScore = 0', () => {
    fetchMock.get('*', [])

    const wrapper = shallow(<Post match={match} />)

    wrapper.setState({ voteScore: 0 })

    expect(wrapper.find('StatisticLabel If').first().prop('test')).toBe(false)
    expect(wrapper.find('StatisticLabel If').last().prop('test')).toBe(true)
  })

  it('show the word Votes when voteScore > 1', () => {
    fetchMock.get('*', [])

    const wrapper = shallow(<Post match={match} />)

    wrapper.setState({ voteScore: 2 })

    expect(wrapper.find('StatisticLabel If').first().prop('test')).toBe(false)
    expect(wrapper.find('StatisticLabel If').last().prop('test')).toBe(true)
  })

  it('show the word Vote when voteScore = 1', () => {
    fetchMock.get('*', [])

    const wrapper = shallow(<Post match={match} />)

    wrapper.setState({ voteScore: 1 })

    expect(wrapper.find('StatisticLabel If').first().prop('test')).toBe(true)
    expect(wrapper.find('StatisticLabel If').last().prop('test')).toBe(false)
  })

  it('show votes label in color red when the voteScore < 0 ', () => {
    fetchMock.get('*', [])

    const wrapper = shallow(<Post match={match} />)

    wrapper.setState({ voteScore: -1 })

    expect(wrapper.find('Statistic').prop('color')).toBe('red')
  })

  it('show votes label in color blue when the voteScore = 0 ', () => {
    fetchMock.get('*', [])

    const wrapper = shallow(<Post match={match} />)

    wrapper.setState({ voteScore: 0 })

    expect(wrapper.find('Statistic').prop('color')).toBe('blue')
  })

  it('show votes label in color blue when the voteScore > 0 ', () => {
    fetchMock.get('*', [])

    const wrapper = shallow(<Post match={match} />)

    wrapper.setState({ voteScore: 1 })

    expect(wrapper.find('Statistic').prop('color')).toBe('blue')
  })
})


