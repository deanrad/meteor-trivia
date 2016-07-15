import { Meteor } from 'meteor/meteor'
import { fromJS } from 'immutable'
import { combineReducers } from 'redux-immutable'
import { createReducer } from 'redux-act'
import * as Game from './game'
import * as Round from './round'

// The magic! We define our state, and delegate control over its parts
// to corresponding reducers
let stateReducer = combineReducers({
  game: createReducer(Game.actionReducers, fromJS(Game.initialState)),
  round: createReducer(Round.actionReducers, fromJS(Round.initialState))
})

let reducer = stateReducer      // eslint-disable-line import/no-mutable-exports

// the client can allow its state to be fully reset
if (Meteor.isClient) {
  // eslint-disable-next-line global-require
  let { resetAction, resetReducer } = require('./client/reset')

  // intercept RESET events; allow others to be handled normally
  reducer = (state, action) => {
    let newState = resetReducer(state, action)
    if (newState != state) return newState  // eslint-disable-line eqeqeq

    return stateReducer(state, action)
  }
}

export default reducer
