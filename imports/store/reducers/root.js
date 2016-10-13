/* eslint {curly: 0, no-use-before-define:0, global-require:0, import/no-mutable-exports:0} */
import { combineReducers } from 'redux-immutable'
import gameReducer from './game'
import roundReducer from './round'

// The magic! We define our state, and delegate control over its parts
// to corresponding reducers

export default combineReducers({
  game: gameReducer,
  round: roundReducer
})
