import { _ } from 'meteor/underscore'
import { Meteor } from 'meteor/meteor'

// Takes a publish function expecting 'this', and returns one that receives
// its context as its first argument. Allows you to use arrow functions
let unThisify = (fn) =>
  // the returned function will be invoked fn.call(ctx, ...args)
  function (...explicitArgs) {
    let ctx = this
    _.bindAll(ctx, 'added', 'changed', 'removed', 'onStop', 'ready', 'stop')
    return fn.apply(null, [ctx, ...explicitArgs])
  }

export const createPublication = (name, fn) =>
  Meteor.publish(name, unThisify(fn))
