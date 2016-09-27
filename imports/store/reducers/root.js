/* eslint {curly: 0, no-use-before-define:0, global-require:0, import/no-mutable-exports:0} */
import { fromJS } from 'immutable'
import { combineReducers } from 'redux-immutable'
import { createReducer } from 'redux-act'
import * as Game from './game'

// The magic! We define our state, and delegate control over its parts
// to corresponding reducers
let stateReducer = combineReducers({
  game: createReducer(Game.actionReducers, fromJS(Game.initialState))
})

export default stateReducer

// export this so we can define an object suitable for insertion on startup
export const initialStateTree = fromJS({
  mode: 'INIT',
  game: Game.initialState
})
