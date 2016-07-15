import { Meteor } from 'meteor/meteor'
import { Games } from '../../collections/collections'

import storeDispatchStream from '../streams/storeDispatchStream'

if (Games.find().count() === 0) {
  Games.insert({})
}

let singletonGame = Games.findOne()
let singletonId = singletonGame && singletonGame._id

// We want latencies from this listener not to block other listeners
// - A Meteor.sleep(1500) should not delay anything being sent upstream
storeDispatchStream.subscribe(state => Meteor.defer(() => {
  console.log('Updating mongo with new state...')

  Meteor.sleep(1500)
  Games.update(singletonId, state)

  console.log('Mongo updated', state, singletonId)
}))

