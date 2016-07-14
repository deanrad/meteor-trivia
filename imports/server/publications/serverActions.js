import { Mongo } from 'meteor/mongo'
import store from '/imports/store/store'
import { createPublication } from './createPublication'
import incomingClientActions from '../streams/incomingClientActions'

// Note - Mergebox will not publish events that are dupes of previous ones, thus the
// inclusion of always-unique ObjectIDs on messages
createPublication('serverActions', ({ connection, added, error, ready, onStop }) => {
  console.log(`got subscriber ${connection.id}, and sending them our state`)
  added('serverActions', new Mongo.ObjectID(), { type: 'RESET', payload: store.getState().toJS() })

  let subscriberListener = {
    next: action => {
      console.log(`sending action upstream to ${connection.id}`, action)
      added('serverActions', new Mongo.ObjectID(), action)
    },
    error: () => error,
    complete: () => console.log('xstream complete')
  }

  // each subscriber becomes a listener
  incomingClientActions.addListener(subscriberListener)

  onStop(() => {
    console.log(`${connection.id} has said bye-bye`)
    incomingClientActions.removeListener(subscriberListener)
  })

  ready()
})
