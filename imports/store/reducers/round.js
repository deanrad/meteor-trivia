import { createAction } from 'redux-act'

export const initialState = {
  question: null,
  judged: null,
  responses: []
}

let begin = createAction('ROUND_BEGIN')
let respond = createAction('ROUND_RESPOND')
let judge = createAction('ROUND_JUDGE')

export const actions = {
  begin,
  respond,
  judge
}

// LEFTOFF: beginning and advancing a round with real questions
let question = {
  prompt: 'Meteor had which earlier name?',
  choices: [
    'Asteroid',
    'Dinosaur',
    'Skybreak',
    'Skynet'
  ],
  correctAnswer: 'Skybreak'
}

export const actionReducers = {
  [begin]: (round) => round.set('question', question),
  [judge]: (round) => round.set('judged', true),
  [respond]: (round, response) => round.update('responses', responses => responses.push(response))
}
