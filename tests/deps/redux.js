/* eslint-disable */
import { createStore } from 'redux'
import { assert, expect } from 'chai'

describe('redux', function () {
  let reducer = (state = {}, action) => {
    if (action.type == 'ERROR') throw new Error('ERROR')
    return state
  }
  let store = createStore(reducer)

  describe('subscribe', function () {
    let updateAmt

    beforeEach(() => {updateAmt = 0})

    it('should run all subscriptions before returning from dispatch', function () {
      let unsub1 = store.subscribe(() => {updateAmt += 1})
      let unsub2 = store.subscribe(() => {updateAmt += 2})
      store.dispatch({type: 'FOO'})
      expect(updateAmt).to.equal(3)
    })

    it('should not notice errors', () => {
      let unsub1 = store.subscribe(() => {updateAmt += 1})
      try {
        // dispatch will synchronously notice the error
        store.dispatch({type: 'ERROR'})
        assert(false)
      } catch (e) {
        assert(true)
      }
      expect(updateAmt).to.equal(0)
    })
  })
})
