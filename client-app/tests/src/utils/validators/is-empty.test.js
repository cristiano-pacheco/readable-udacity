import { expect } from 'chai'
import isEmpty from '../../../../src/utils/validators/is-empty'

describe('IsEmpty()', () => {
  it('should isEmpty to be a function', () => {
    expect(isEmpty).to.be.a('function')
  })

  it('should isEmpty() to be true', () => {
    expect(isEmpty()).to.equal(true)
  })

  it('should isEmpty("") to be true', () => {
    expect(isEmpty('')).to.equal(true)
  })

  it('should isEmpty("   ") to be true', () => {
    expect(isEmpty('   ')).to.equal(true)
  })

  it('should isEmpty("string") to be false', () => {
    expect(isEmpty('string')).to.equal(false)
  })
})
