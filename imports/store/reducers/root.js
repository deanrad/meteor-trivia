/* eslint {curly: 0, no-use-before-define:0, global-require:0, import/no-mutable-exports:0} */
import { Meteor } from 'meteor/meteor'
import { fromJS } from 'immutable'
import { combineReducers as createStateTree } from 'redux-immutable'
import { createReducer } from 'redux-act'
import * as Game from './game'
import * as Round from './round'

// The magic! We define our state, and delegate control over its parts
// to corresponding reducers
let stateReducer = createStateTree({
  game: createReducer(Game.actionReducers, fromJS(Game.initialState)),
  round: createReducer(Round.actionReducers, fromJS(Round.initialState))
})

let reducer = stateReducer

if (Meteor.isClient) {
  // the client can allow its state to be fully reset
  let { resetAction, resetReducer } = require('./client/reset')

  // intercept initial 'global' actions; allow others to be handled normally
  reducer = createDefaultedReducer(
    {
      [resetAction]: resetReducer
    }, stateReducer)
}

function createDefaultedReducer (actions, defaultReducer) {
  return (state, action) => {
    let reducer = actions[action.type] || (s => s)
    let newState = reducer(state, action)
    if (newState != state) // eslint-disable-line eqeqeq
      return newState
    else
      return defaultReducer(state, action)
  }
}

export default reducer
