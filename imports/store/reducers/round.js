import { createAction } from 'redux-act'

export const initialState = {}

let begin = createAction('ROUND_BEGIN')
let judge = createAction('ROUND_JUDGE')

export const actions = {
  begin,
  judge
}

// LEFTOFF: beginning and advancing a round with real questions
export const actionReducers = {
  [begin]: (round) => round.set('question', { prompt: 'What ?' }),
  [judge]: (round) => round.set('judged', true)
}
