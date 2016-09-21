import { UniMethod } from 'meteor/deanius:uni-method'

import { pushNext } from '../../server/streams/incomingClientActions'

export const { dispatchAction } = UniMethod.define('dispatchAction', (action) => {
  console.log('  --------------  ')
  console.log(`M> Recieved ${action.type} from client, handing off downstream..`)
  pushNext(action)
})
