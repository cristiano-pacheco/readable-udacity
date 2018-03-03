import * as CommentValidator from '../../../../../src/components/post/comments/validator'

describe('CommentValidator', () => {
  it('returns error messages when the body and author is empty', () => {
    const expected = [
      'The Body field is required.',
      'The Author field is required.'
    ]
    expect(CommentValidator.validate([])).toEqual(expected)
  })

  it('returns error message when the length of the fields is less than expected', () => {
    const expected = [
      'The Body must be at least 5 characters.',
      'The Author must be at least 3 characters.'
    ]
    const fields = {
      author: 'a',
      body: 'a'
    }
    expect(CommentValidator.validate(fields)).toEqual(expected)
  })
})
