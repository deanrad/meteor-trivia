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

// EXPERIMENTAL - a raw Redux middleware which can dispatch new actions upon hearing
// of
const hinter = ({ dispatch }) => (next) => (action) => {
  if (action.type === 'ROUND_HINT_NARROW') {
    dispatch(Round.actions.narrow())
  }

  return next(action)
}

export default storeFactory(rootReducer, new Map(), applyMiddleware(thunk, hinter))
