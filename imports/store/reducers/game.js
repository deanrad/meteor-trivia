import { createAction } from 'redux-act'

export const initialState = {
  title: 'Meteor Redux Trivia',
  players: [],
  status: 'awaiting players',
  questions: [
    {
      prompt: 'Meteor had which earlier name?',
      choices: [
        'Asteroid',
        'Dinosaur',
        'Skybreak',
        'Skynet'
      ],
      correctAnswer: 'Skybreak'
    }
  ]
}

let begin = createAction('GAME_BEGIN')

export const actionReducers = {
  [begin]: (state) => state.set('status', 'game on!')
}

export const actions = {
  begin
}
