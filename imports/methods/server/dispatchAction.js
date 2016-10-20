import { UniMethod } from 'meteor/deanius:uni-method'

import { dispatch } from '../../server/streams/dispatchedActions'

export const dispatchAction = UniMethod.define('dispatchAction', function (action) {
  let client = this
  console.log('  --------------  ')
  console.log(`M> (${client.connection.id}) {type: ${action.type}}`)

  action.meta = {
    connectionId: client.connection.id
  }

  return dispatch(action)
})
