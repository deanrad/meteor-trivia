import { Meteor } from 'meteor/meteor'
import { createAction } from 'redux-act'

import { createStatefulImmutableReducer } from './createStatefulImmutableReducer'

const begin = createAction('GAME_BEGIN')
const end = createAction('GAME_END')

export const initialState = {
  title: 'Meteor Redux Trivia',
  players: [],
  status: 'awaiting players'
}

export const actions = {
  begin,
  end
}

export const allowedTransitions = {
  GAME_BEGIN: {
    GAME_BEGIN: 'GAME_BEGIN',
    GAME_END: 'GAME_END'
  },
  GAME_END: {
    GAME_END: 'GAME_END'
  }
}

export const actionReducers = {
  [begin]: (game) => game.set('status', 'game on!'),
  [end]: (game) => game.set('status', 'Game over, man!')
}

export default createStatefulImmutableReducer({
  actionReducers,
  initialState,
  allowedTransitions,
  onInvalidTransition: ({ from, to }) => {
    throw new Meteor.Error('FYI: Invalid Transition: ' + from + '->' + to)
  }
})
