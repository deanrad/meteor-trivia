import { createAction } from 'redux-act'

export const initialState = {
  question: undefined,
  outcome: undefined,
  client: {
    credit: undefined
  }
}

let begin = createAction('ROUND_BEGIN')
let judge = createAction('ROUND_JUDGE')
let credit = createAction('ROUND_CREDIT')

export const actionReducers = {
  [begin]: (round, question) => round.set('question', {
      prompt: 'Meteor had which earlier name?',
      choices: [
        'Asteroid',
        'Dinosaur',
        'Skybreak',
        'Skynet'
      ],
      correctAnswer: 'Skybreak'
    }),
  [judge]: (round, outcome) => round.set('outcome', outcome),
  [credit]: (round, credit) => round.updateIn(['client', 'credit'], (old=0) => (old + credit))
}

export const actions = {
  begin,
  judge,
  credit
}
