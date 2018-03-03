import * as PostValidator from '../../../../src/components/post/validator'

describe('PostValidator', () => {
  it('returns error messages when the fields is empty', () => {
    const expected = [
      'The Category field is required.',
      'The Title field is required.',
      'The Body field is required.',
      'The Author field is required.'
    ]
    expect(PostValidator.validate([])).toEqual(expected)
  })

  it('returns error message when the length of the fields is less than expected', () => {
    const expected = [
      'The Title must be at least 5 characters.',
      'The Body must be at least 5 characters.',
      'The Author must be at least 3 characters.'
    ]
    const fields = {
      category: 1,
      title: 'a',
      author: 'a',
      body: 'a'
    }
    expect(PostValidator.validate(fields)).toEqual(expected)
  })
})
