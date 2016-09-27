import { Games } from '../../collections/collections'

import storeStateStream from '../streams/storeStateStream'
import { diff } from 'mongodb-diff'

let singletonGame = Games.findOne()
let singletonId = singletonGame && singletonGame._id

let updateMongo = (singletonId, diff) => {
  console.log('DB> Updating mongo game', singletonId)

  Games.update(singletonId, diff)

  console.log('DB> Mongo updated', singletonId, diff)
}

// We want latencies from this listener not to block other listeners
// and cant simply use .observeOn(Rx.Scheduler.async) since we need to
// be deferred Meteor-style or we get:
// Error: Meteor code must always run within a Fiber.
// Try wrapping callbacks that you pass to non-Meteor libraries with Meteor.bindEnvironment

// Meteor.defer(fn) gets us there nicely.

// Sync Version
storeStateStream.bufferWithCount(2, 1).subscribe(buffer => {
  let [oldState, newState] = buffer
  updateMongo(singletonId, diff(oldState, newState))
})

// Mongo writes later
// storeStateStream
//   .bufferWithCount(2, 1)
//   .subscribe(buffer => Meteor.setTimeout(() =>{
//     let [oldState, newState] = buffer
//     updateMongo(singletonId, diff(oldState, newState))
//   }, 1000))

// Mongo writes periodically
// storeStateStream
//   .bufferWithCount(2, 1)
//   .someCoolOperator()
//   .subscribe(buffer => Meteor.setTimeout(() =>{
//     let [oldState, newState] = buffer
//     updateMongo(singletonId, diff(oldState, newState))
//   }, 1000))
