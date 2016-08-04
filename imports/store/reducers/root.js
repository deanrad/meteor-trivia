/* eslint {curly: 0, no-use-before-define:0, global-require:0, import/no-mutable-exports:0} */
import { fromJS } from 'immutable'
import { combineReducers as createStateTree } from 'redux-immutable'
import { createReducer } from 'redux-act'
import * as Game from './game'
import * as Round from './round'
import { resetAction, resetReducer } from './reset'
import { advanceQuestionAction, advanceQuestionReducer } from './advanceQuestion'

// The magic! We define our state, and delegate control over its parts
// to corresponding reducers
let stateReducer = createStateTree({
  game: createReducer(Game.actionReducers, fromJS(Game.initialState)),
  round: createReducer(Round.actionReducers, fromJS(Round.initialState))
})

// export this so we can define an object suitable for insertion on startup
export const initialStateTree = fromJS({
  game: Game.initialState,
  round: Round.initialState
})

let reducer = createDefaultedReducer({
  [resetAction]: resetReducer,
  [advanceQuestionAction]: advanceQuestionReducer,
  default: stateReducer
})

// Returns a reducer that applies any action found in its map,
// but otherwise defaults to the reducer under the key 'default' (or the identity fn)
function createDefaultedReducer (actions) {
  return (state, action) => {
    let reducer = actions[action.type] || actions.default || (s => s)
    return reducer(state, action)
  }
}

export default reducer
