import { expect } from 'chai'

import '/tests/testHelper'

// This file must be imported for the dispatch to happen!
// eslint-disable-next-line no-unused-vars
import subject from '/imports/server/listeners/dispatchConsequencesOfActions'

// Put an action on the stream
import { pushNext } from '/imports/server/streams/incomingClientActions'

// See it update the store
import store from '/imports/store/store'

describe('Dispatching consequences of actions', () => {
  describe('Putting an event on the incomingClientActions stream', () => {
    it('causes a dispatch synchronously', () => {
      let storeUpdateCount = 0
      let storeUpdateCountInc = () => { storeUpdateCount += 1 }

      store.subscribe(storeUpdateCountInc)

      pushNext({ type: 'Foo' })

      expect(storeUpdateCount).to.equal(1)
    })
  })
})
