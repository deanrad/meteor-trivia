import { UniMethod } from 'meteor/deanius:uni-method'
import Rx from 'rx'

let thisAction = new Rx.Subject() // todo investigate ReplaySubject for store states

UniMethod.define('dispatchAction', function (action) {
  let client = this
  console.log('  --------------  ')
  console.log(`M> (${client.connection.id}) {type: ${action.type}}`)

  action.meta = {
    connectionId: client.connection.id
  }

  return thisAction.onNext(action)
})

// export a stream of dispatched actions
export const dispatchedActions = thisAction.asObservable()
