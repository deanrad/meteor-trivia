import { UniMethod } from 'meteor/deanius:uni-method'

import { dispatch } from '../../server/streams/dispatchedActions'

export const dispatchAction = UniMethod.define('dispatchAction', (action) => {
  console.log('  --------------  ')
  console.log(`M> Recieved ${action.type} from client, handing off downstream..`)
  return dispatch(action)
})
