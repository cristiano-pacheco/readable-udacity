import { expect } from 'chai'
import isMinLength from '../../../../src/utils/validators/is-min-length'

describe('IsMinLength()', () => {
  it('should isMinLength to be a function', () => {
    expect(isMinLength).to.be.a('function')
  })

  it('should returns true when isMinLength("ab", 3)', () => {
    expect(isMinLength('ab', 3)).to.be.equal(true)
  })

  it('should returns false when isMinLength("ab", 2)', () => {
    expect(isMinLength('ab', 2)).to.be.equal(false)
  })

  it('should returns true when isMinLength()', () => {
    expect(isMinLength()).to.be.equal(true)
  })

  it('should returns true when isMinLength(1, 1)', () => {
    expect(isMinLength(1, 1)).to.be.equal(true)
  })
})
