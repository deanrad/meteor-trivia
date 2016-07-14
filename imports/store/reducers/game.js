import { createAction } from 'redux-act'

export const initialState = {
  name: 'Meteor Redux Trivia',
  players: [],
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
export const actionReducers = {}
export const actions = {}
