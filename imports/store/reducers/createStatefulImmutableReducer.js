import { fromJS } from 'immutable'
import { createReducer } from 'redux-act'

export const createStatefulImmutableReducer = ({
  actionReducers, initialState, allowedTransitions, onInvalidTransition
}) => {
  let iState = fromJS(initialState).set('state', 'init')
  let reducer = createReducer(actionReducers, iState)

  return (state = iState, action) => {
    let currentState = state.get('state')
    let updatedState = state.set('state', action.type)

    // choosing an allowed- we update the state field
    if (currentState === 'init' ||
        (allowedTransitions[currentState] && allowedTransitions[currentState][action.type])) {
      return reducer(updatedState, action)
    }

    // dont know whats allowed from here, initializing, continue to update state
    if (! allowedTransitions[currentState] ||
          ['@@redux/INIT', '@@INIT'].indexOf(action.type) > -1) {
      return reducer(updatedState, action)
    }

    let ourActions = Object.keys(actionReducers)
    if (! ourActions.includes(action.type)) {
      return reducer(state, action)
    }

    // not an allowed one - notify caller (which can throw exception if desired)
    onInvalidTransition({ from: currentState, to: action.type })

    return reducer(state, action)
  }
}
