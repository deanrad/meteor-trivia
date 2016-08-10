/* eslint-disable */
import { createStore } from 'redux'
import { expect } from 'chai'

describe('redux', function () {
  let store = createStore((state = {}, action) => state)

  describe('subscribe', function () {
    let updateAmt

    beforeEach(() => {updateAmt = 0})

    it('should run all subscriptions before returning from dispatch', function () {
      let unsub1 = store.subscribe(() => {updateAmt += 1})
      let unsub2 = store.subscribe(() => {updateAmt += 2})
      store.dispatch({type: 'FOO'})
      expect(updateAmt).to.equal(3)
    });
  });
});
