import { createReducer } from 'redux-act'
import { expect } from 'chai'

describe('redux-act', () => {
  describe('createReducer', () => {
    let callCount

    let iVal = {}
    let subject = createReducer({
      FOO: (a, b) => { callCount += 1; return a + b }
    }, iVal)

    beforeEach(() => { callCount = 0 })

    describe('Invoking - pass undefined as first arg', () => {
      it('should return an exact reference to the initial value', () => {
        let iVal1 = subject()
        let iVal2 = subject()
        expect(iVal1).to.equal(iVal)
        expect(iVal2).to.equal(iVal)
        expect(iVal1).to.equal(iVal2)
        expect(callCount).to.equal(0)
      })
    })

    describe('Invoking with no matching action', () => {
      it('returns the first argument', () => {
        let iVal = {}
        let result = subject(iVal, { type: 'NOTMATCH', value: 0 })
        expect(result).to.equal(iVal)
        expect(callCount).to.equal(0)
      })
    })

    describe('Invoking with matching action', () => {
      it('returns the result of calling reducer with iVal and action.payload', () => {
        let result = subject(3.14, { type: 'FOO', payload: 1.06 })
        expect(result).to.equal(4.20)
        expect(callCount).to.equal(1)
      })
    })
  })
})
