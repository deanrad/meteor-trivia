import { Meteor } from 'meteor/meteor'
import { Games } from '../../collections/collections'

import storeStateStream from '../streams/storeStateStream'

let singletonGame = Games.findOne()
let singletonId = singletonGame && singletonGame._id

// We want latencies from this listener not to block other listeners
// and cant simply use .observeOn(Rx.Scheduler.async) since we need to
// be deferred Meteor-style or we get:
// Error: Meteor code must always run within a Fiber.
// Try wrapping callbacks that you pass to non-Meteor libraries with Meteor.bindEnvironment
storeStateStream.subscribe(state => Meteor.defer(() => {
  console.log('Updating mongo game', singletonId)

  // XXX in future a more granular update could be produced off of the last two states
  // for now we're just clobbering the whole mongo document - I suspect it's smart about
  // doing the minimal thing internally and we'd only save network bandwidth/time by
  // doing less
  Games.update(singletonId, state)

  console.log('Mongo updated', state, singletonId)
}))
