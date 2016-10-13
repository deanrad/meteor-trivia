import { combineReducers } from 'redux-immutable'
import gameReducer from './game'
import roundReducer from './round'

// The magic! We define our state, and delegate control over its parts
// to corresponding reducers

export default combineReducers({
  game: gameReducer,
  round: roundReducer
})
