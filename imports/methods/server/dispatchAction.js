import { UniMethod } from 'meteor/deanius:uni-method'

import { fromJS } from 'immutable'
import { pushNext } from '/imports/server/streams/incomingClientActions'

let preDispatch = () => {}
const handleDispatch = (action) => {
  console.log(`Recieved ${action.type} from client, putting on stream..`)
  pushNext(fromJS(action))
}

export const { dispatchAction } = UniMethod.methods({
  dispatchAction: {
    clientStub: preDispatch,
    serverMethod: handleDispatch
  }
})
