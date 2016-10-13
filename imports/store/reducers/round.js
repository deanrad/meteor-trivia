import { fromJS, Map } from 'immutable'
import { createAction, createReducer } from 'redux-act'

const begin = createAction('ROUND_BEGIN')
const respond = createAction('ROUND_RESPOND')
const judge = createAction('ROUND_JUDGE')
const credit = createAction('ROUND_CREDIT')
const advance = createAction('ROUND_ADVANCE')

// the user creates asking for a hint
const hintNarrow = createAction('ROUND_HINT_NARROW')
const narrow = createAction('ROUND_NARROW')

export const initialState = {
  question: undefined,
  outcome: undefined,
  client: {
    credit: undefined,
    response: undefined
  }
}

export const actions = {
  begin,
  respond,
  judge,
  credit,
  advance,
  hintNarrow,
  narrow
}

const actionReducers = {
  [begin]: (round) => round.set('question', fromJS({
    prompt: 'Meteor had which earlier name?',
    choices: [
      'Asteroid',
      'Dinosaur',
      'Skybreak',
      'Skynet'
    ],
    correctAnswer: 'Skybreak'
  })),
  [respond]: (round, response) => round.setIn(['client', 'response'], response),
  [judge]: (round, outcome) => round.set('outcome', outcome),
  [credit]: (round, credit) => round.updateIn(['client', 'credit'], (old = 0) => (old + credit)),
  [advance]: (round) => round.mergeIn(['question'], fromJS({
    prompt: 'What the?',
    choices: [
      'C',
      'D',
      'E',
      'F'
    ],
    correctAnswer: 'F'
  })),
  [narrow]: (round) => round.update('question', question =>
      question && question.update('choices', choices =>
        choices.shift())),
  GAME_END: () => { return new Map() }
}

export default createReducer(actionReducers, fromJS(initialState))
