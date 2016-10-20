import * as Round from '../reducers/round'

// A 'Business Logic' Redux middleware which can dispatch new actions
export const hinter = ({ dispatch, getState }) => (next) => (action) => {
  // First: process the action normally
  let result = next(action)

  // dispatch any additional side effects, even if async..
  if (action.type === 'ROUND_HINT_NARROW') {
    let choices = getState().getIn(['round', 'question', 'choices'])

    if (choices && choices.size > 2) {
      let narrowAction = Round.actions.narrow()

      // preserve + extend the original action's metadata
      narrowAction.meta = { ...action.meta, origin: 'server' }

      setTimeout(() => { dispatch(narrowAction) }, 750)
    }
  }

  // return whatever you want, usually the last result
  return result
}
