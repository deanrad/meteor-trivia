import { createAction } from 'redux-act'

export const initialState = {
  title: 'Meteor Redux Trivia',
  players: [],
  status: 'awaiting players'
}

let begin = createAction('GAME_BEGIN')
let end = createAction('GAME_END')

export const actionReducers = {
  [begin]: (game) => game.set('status', 'game on!'),
  [end]: (game) => game.set('status', 'Game over, man!')
}

export const actions = {
  begin,
  end
}
