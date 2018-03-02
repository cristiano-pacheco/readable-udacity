import { PostGrid } from '../../../../src/components/post/grid'

const func = () => {}
const voidPosts = {
  data: []
}

const posts = {
  data: [
    { id: 'id', timestamp: Date.now(), author: 'chris', commentCount: 0, voteScore: 1 },
    { id: 'id2', timestamp: Date.now(), author: 'icaro', commentCount: 0, voteScore: 10 }
  ]
}

describe('<PostGrid />', () => {
  it('shalow renders correctly', () => {
    expect(shallow(<PostGrid
      sort={func}
      columnSort={func}
      deletePost={func}
      posts={voidPosts}
    />))
  })

  it('calls sort when the column headers is clicked', () => {
    const sort = jest.fn()
    const wrapper = shallow(<PostGrid
      sort={sort}
      columnSort={func}
      deletePost={func}
      posts={voidPosts}
    />)

    const columns = [
      { column: 'column-title', name: 'title' },
      { column: 'column-date', name: 'timestamp' },
      { column: 'column-author', name: 'author' },
      { column: 'column-comment-count', name: 'commentCount' },
      { column: 'column-vote-score', name: 'voteScore' }
    ]

    columns.forEach(item => {
      sort.mockClear()
      wrapper.find(`TableHeaderCell[data-js="${item.column}"]`).simulate('click')
      expect(sort).toHaveBeenCalledTimes(1)
      expect(sort).toHaveBeenCalledWith(item.name)
    })
  })

  it('shows no posts found when the array of posts is empty', () => {
    const wrapper = shallow(<PostGrid
      sort={func}
      columnSort={func}
      deletePost={func}
      posts={voidPosts}
    />)
    expect(wrapper
      .find('TableCell[data-js="empty-posts"]')
      .contains('No Posts Found.'))
    .toBe(true)
  })

  it('map array of posts and show TableRow tag for each one of them', () => {
    const wrapper = shallow(<PostGrid
      sort={func}
      columnSort={func}
      deletePost={func}
      posts={posts}
    />)
    expect(wrapper.find('TableRow[data-js="row-post"]').length).toBe(2)
  })

  it('calls deletePost when delete button is clicked', () => {
    const deletePost = jest.fn()
    const wrapper = shallow(<PostGrid
      sort={func}
      columnSort={func}
      deletePost={deletePost}
      posts={posts}
    />)
    wrapper.find('Icon[data-js="btn-delete-post"]').first().simulate('click')
    expect(deletePost).toHaveBeenCalledTimes(1)
    expect(deletePost).toHaveBeenCalledWith('id')
  })
})
