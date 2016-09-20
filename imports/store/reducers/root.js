/* eslint {curly: 0, no-use-before-define:0, global-require:0, import/no-mutable-exports:0} */
import { fromJS } from 'immutable'
import { combineReducers } from 'redux'
import { createReducer } from 'redux-act'
import * as Game from './game'

let modeTransitions = {
  [['INIT', 'GAME_BEGIN']]: 'GAME_ON',
  [['GAME_OVER', 'GAME_BEGIN']]: 'GAME_ON',
  [['GAME_ON', 'GAME_END']]: 'GAME_OVER'
}

let getNextMode = (state, action) => modeTransitions[[state, action.type]]

let modeReducer = (state, action) => {
  if (!state) return 'INIT'

  let nextMode = getNextMode(state, action)

  return nextMode || state
}

// The magic! We define our state, and delegate control over its parts
// to corresponding reducers
let stateReducer = combineReducers({
  mode: modeReducer,
  // TODO disallow changes to other reducers if modeReducer errors
  game: createReducer(Game.actionReducers, Game.initialState),
})

let modalReducer = (state, action) => {
  let mode = state && state.mode
  let nextMode = getNextMode(mode, action)

  if (!state) return stateReducer(state, action) // @@redux/INIT

  // OK
  if (nextMode) {
    console.log(`mode transition ${mode} -> ${nextMode}`)
    return stateReducer(state, action)
  }

  // Else NOOP - just log for now - no synchronous error desired
  console.log(`Illegal mode transition on [${mode}, ${action.type}]`)
  return state
}

export default modalReducer

// export this so we can define an object suitable for insertion on startup
export const initialStateTree = fromJS({
  mode: 'INIT',
  game: Game.initialState
})
