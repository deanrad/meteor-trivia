import { UniMethod } from 'meteor/deanius:uni-method'

import { pushNext } from '/imports/server/streams/incomingClientActions'

export const { dispatchAction } = UniMethod.define('dispatchAction', (action) => {
  console.log(`Recieved ${action.type} from client, handing off downstream..`)
  pushNext(action)
})
