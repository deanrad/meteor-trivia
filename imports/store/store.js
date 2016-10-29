import { Meteor } from 'meteor/meteor'
import { createStore, applyMiddleware } from 'redux'
import { Map } from 'immutable'
import Rx from 'rx'
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

// Expose the merged stream of synchronous actions the store sees
// As the last middleware in the stack, allows you to see 'expanded' stream of actions,
// Useful for when middlewares alter the incoming stream of actions
const thisAction = new Rx.Subject()
export const processedActions = thisAction.asObservable()
middlewares.push((/* store */) => next => action => {
  thisAction.onNext(action)
  return next(action)
})


const store = storeFactory(rootReducer,
  new Map(),
  applyMiddleware(...middlewares)
)

store.processedActions = processedActions

export default store
