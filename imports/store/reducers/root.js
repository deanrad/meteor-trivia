import { Meteor } from 'meteor/meteor'
import { fromJS } from 'immutable'
import { combineReducers } from 'redux-immutable'
import { createReducer } from 'redux-act'
import * as Game from './game'

let initialState = fromJS(Meteor.isClient ? {} : Game.initialState)
let stateReducer = combineReducers({
  game: createReducer(Game.actionReducers, initialState)
})

// eslint-disable-next-line import/no-mutable-exports
let reducer = stateReducer

// the client can allow its state to be fully reset
if (Meteor.isClient) {
  // eslint-disable-next-line global-require
  let { resetAction } = require('./client/reset')
  // intercept RESET events; allow others to be handled normally
  let resetReducer = (state, action) => {
    if (resetAction.toString() === action.type) {
      return fromJS(action.payload)
    }
    return stateReducer(state, action)
  }
  reducer = resetReducer
}

export default reducer
