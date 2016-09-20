/* eslint {curly: 0, no-use-before-define:0, global-require:0, import/no-mutable-exports:0} */
import { fromJS } from 'immutable'
import { combineReducers as combineReducersImm } from 'redux-immutable'
import { combineReducers } from 'redux'
import { createReducer } from 'redux-act'
import * as Game from './game'
import * as Round from './round'
import { resetAction, resetReducer } from './reset'
import { advanceQuestionAction, advanceQuestionReducer } from './advanceQuestion'

let modeTransitions = {
  [['INIT', 'GAME_BEGIN']]: 'GAME_ON',
  [['GAME_ON', 'GAME_END']]: 'GAME_OVER'
}

let modeReducer = (state, action) => {
  if (!state) return 'INIT'

  console.log('calculating next mode')
  let nextMode = modeTransitions[ [state, action.type] ]

  if (nextMode)
    return nextMode
  else
    return state
}

// The magic! We define our state, and delegate control over its parts
// to corresponding reducers
let stateReducer = combineReducers({
  mode: modeReducer,
  game: createReducer(Game.actionReducers, Game.initialState),
})

export default stateReducer

// export this so we can define an object suitable for insertion on startup
export const initialStateTree = fromJS({
  mode: 'INIT',
  game: Game.initialState
})
