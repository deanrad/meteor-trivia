import { UniMethod } from 'meteor/deanius:uni-method'

import { dispatch } from '../../server/streams/dispatchedActions'

export const dispatchAction = UniMethod.define('dispatchAction', (action) => {
  console.log('  --------------  ')
  console.log(`M> {type: ${action.type}}`)
  return dispatch(action)
})
