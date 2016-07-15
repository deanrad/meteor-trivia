import { fromJS as makeImmutable } from 'immutable'
import { createAction, createReducer } from 'redux-act'

export const resetAction = createAction('RESET')
export const resetReducer = createReducer({
  [resetAction]: (state, payload) => makeImmutable(payload)
})
