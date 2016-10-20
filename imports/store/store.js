import { Meteor } from 'meteor/meteor'
import { createStore, applyMiddleware } from 'redux'
import { Map } from 'immutable'
import rootReducer from './reducers/root'
import * as RoundEpics from './epics/round'

let storeFactory = createStore

if (Meteor.isClient) {
  if (window.devToolsExtension) {
    storeFactory = window.devToolsExtension()(createStore)
  }
}

// Both client and server include these middlewares
const middlewares = [RoundEpics.hinter]

// On the server, where we expand actions, we publish a stream of actions about to
// be dispatched to the store, exposing them to publications, etc..
if (Meteor.isServer) {
    // eslint-disable-next-line global-require
  let { pushNext } = require('../server/streams/expandedActions')
  // As the last middleware in the stack, allows you to see 'expanded' stream of actions,
  // Useful for when middlewares alter the incoming stream of actions
  // eslint-disable-next-line no-unused-vars
  middlewares.push(store => next => action => {
    pushNext(action)
    return next(action)
  })
}

export default storeFactory(rootReducer,
  new Map(),
  applyMiddleware(...middlewares)
)
