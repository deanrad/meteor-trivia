import { createAction, createReducer } from 'redux-act'

export const advanceQuestionAction = createAction('ADVANCE_QUESTION')

// XXX LEFTOFF refactor so this breaks into multiple actions and works
// when game.questions is not available
export const advanceQuestionReducer = createReducer({
  [advanceQuestionAction]: (state) => {
    return state
      .updateIn(['round', 'question'], () => state.getIn(['game', 'questions']).first())
      .updateIn(['game', 'questions'], qs => qs.skip(1))
  }
})
