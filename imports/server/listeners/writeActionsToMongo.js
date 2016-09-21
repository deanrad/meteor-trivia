import { Meteor } from 'meteor/meteor'
import { Games } from '../../collections/collections'

import storeStateStream from '../streams/storeStateStream'
import { diff } from './mongoDiff'

let singletonGame = Games.findOne()
let singletonId = singletonGame && singletonGame._id

let updateMongo = (state, singletonId) => {
  console.log('Updating mongo game', singletonId)

  // XXX in future a more granular update could be produced off of the last two states
  // for now we're just clobbering the whole mongo document - I suspect it's smart about
  // doing the minimal thing internally and we'd only save network bandwidth/time by
  // doing less
  Games.update(singletonId, state)

  console.log('Mongo updated', state, singletonId)
}

// We want latencies from this listener not to block other listeners
// and cant simply use .observeOn(Rx.Scheduler.async) since we need to
// be deferred Meteor-style or we get:
// Error: Meteor code must always run within a Fiber.
// Try wrapping callbacks that you pass to non-Meteor libraries with Meteor.bindEnvironment

// Meteor.defer(fn) gets us there nicely.

let allButFirst = storeStateStream.skip(1)

allButFirst.bufferWithCount(2, 1).subscribe(buffer => Meteor.defer(() => {
  let [oldState, newState] = buffer

  Promise.resolve()
    .then(() => {
      return diff(oldState, newState)
    })
    .then(delta => {
      console.log('Diff', delta)
      updateMongo(delta, singletonId)
    })
    .catch(e => console.log(e))
  // console.log('The diff', d)

  // TODO update with only the diff
}))
