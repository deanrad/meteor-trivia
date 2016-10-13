import { Meteor } from 'meteor/meteor'
import { createStore, applyMiddleware } from 'redux'
import { Map } from 'immutable'
import thunk from 'redux-thunk'
import rootReducer from './reducers/root'
import * as Round from './reducers/round'

let storeFactory = createStore

if (Meteor.isClient) {
  if (window.devToolsExtension) {
    storeFactory = window.devToolsExtension()(createStore)
  }
}

// A 'Business Logic' Redux middleware which can dispatch new actions
const hinter = ({ dispatch }) => (next) => (action) => {

  // process the action normally
  let result = next(action)

  // dispatch any additional side effects, even if async..
  if (action.type === 'ROUND_HINT_NARROW') {
    result = dispatch(Round.actions.narrow())
  }

  // return whatever you want, usually the last result
  return result
}

// client and server include these middlewares,
const middlewares = [thunk, hinter]

const maybeAddServerMiddlewares = () => {
  if (Meteor.isServer) {
    // allow you to use redux-thunk or similar, and see 'expanded' stream of actions
    import { pushNext } from '../server/streams/expandedActions'

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
