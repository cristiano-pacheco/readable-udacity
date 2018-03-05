import { expect } from 'chai'
import isEmpty from '../../../../src/utils/validators/is-empty'

describe('IsEmpty()', () => {
  it('should isEmpty to be a function', () => {
    expect(isEmpty).to.be.a('function')
  })

  it('should isEmpty() to be true', () => {
    expect(isEmpty()).to.be.true
  })

  it('should isEmpty("") to be true', () => {
    expect(isEmpty('')).to.be.true
  })

  it('should isEmpty("   ") to be true', () => {
    expect(isEmpty('   ')).to.be.true
  })

  it('should isEmpty("string") to be false', () => {
    expect(isEmpty('string')).to.be.false
  })
})
