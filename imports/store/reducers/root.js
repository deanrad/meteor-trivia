/* eslint {curly: 0, no-use-before-define:0, global-require:0, import/no-mutable-exports:0} */
import { fromJS } from 'immutable'
import { combineReducers } from 'redux-immutable'
import { createReducer } from 'redux-act'
import * as Game from './game'
import * as Round from './round'

// The magic! We define our state, and delegate control over its parts
// to corresponding reducers
const stateReducer = combineReducers({
  game: createReducer(Game.actionReducers, fromJS(Game.initialState)),
  round: createReducer(Round.actionReducers, fromJS(Round.initialState))
})

export default stateReducer
