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
let end = createAction('GAME_END')

export const actionReducers = {
  [begin]: (state) => ({ ...state, status: 'Game on!' }),
  [end]: (state) => ({ ...state, status: 'Game over, man!' })
}

export const actions = {
  begin,
  end
}
