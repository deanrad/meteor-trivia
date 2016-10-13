import { Meteor } from 'meteor/meteor'
import { _ } from 'meteor/underscore'
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

// client and server include these middlewares,
const middlewares = [...(_.values(RoundEpics))]

// As the last middleware in the stack, allows you to see 'expanded' stream of actions,
// Useful for when middlewares alter the incoming stream of actions
const maybeAddServerMiddlewares = () => {
  if (Meteor.isServer) {
    // eslint-disable-next-line global-require
    let { pushNext } = require('../server/streams/expandedActions')

    // eslint-disable-next-line no-unused-vars
    const streamer = store => next => action => {
      pushNext(action)
      return next(action)
    }

    middlewares.push(streamer)
  }
}
maybeAddServerMiddlewares()

export default storeFactory(rootReducer,
  new Map(),
  applyMiddleware(...middlewares)
)
