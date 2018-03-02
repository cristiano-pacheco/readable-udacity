import { Home } from '../../../../src/components/home'

const func = () => {}

const location = {
  pathname: '/'
}

const match = {
  params: ''
}

const history = {
  listen: func
}

const fetchPosts = func

describe('<Home />', () => {
  it('shalow renders correctly', () => {
    expect(shallow(<Home
      match={match}
      history={history}
      location={location}
      fetchCategories={func}
      fetchPosts={fetchPosts}
      fetchPostsByCategory={func}
    />))
  })

  it('calls fetchPosts when pathname is /', () => {
    const fetchPosts = jest.fn()
    const location = {
      pathname: '/'
    }
    shallow(<Home
      match={match}
      history={history}
      location={location}
      fetchCategories={func}
      fetchPosts={fetchPosts}
      fetchPostsByCategory={func}
    />)
    expect(fetchPosts).toHaveBeenCalledTimes(1)
  })

  it('calls fetchPostsByCategory when pathname != /', () => {
    const fetchPostsByCategory = jest.fn()
    const location = {
      pathname: '/category'
    }
    shallow(<Home
      match={match}
      history={history}
      location={location}
      fetchCategories={func}
      fetchPosts={func}
      fetchPostsByCategory={fetchPostsByCategory}
    />)
    expect(fetchPostsByCategory).toHaveBeenCalledTimes(1)
  })
})
