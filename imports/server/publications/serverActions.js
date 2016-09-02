import { Mongo } from 'meteor/mongo'
import store from '/imports/store/store'
import { createPublication } from './createPublication'
import clientUpdatesStream, { sanitizePayload } from '../streams/clientUpdatesStream'

// Note - Mergebox will not publish events that are dupes of previous ones, thus the
// inclusion of always-unique ObjectIDs on messages
createPublication('serverActions', ({ connection, added, error, ready, onStop }) => {
  console.log(`got subscriber ${connection.id}, sent state`,
    JSON.stringify(sanitizePayload(store.getState()).toJS()))

  added('serverActions', new Mongo.ObjectID(),
    {
      type: 'RESET',
      payload: sanitizePayload(store.getState()).toJS(),
      meta: { fromServer: 1 }
    })

  // each subscriber becomes a listener
  let subscription = clientUpdatesStream.subscribe((action) => {
    console.log(`sending action upstream to ${connection.id}`, action.toJS())
    added('serverActions',
      new Mongo.ObjectID(),
      { ...action.toJS(), meta: { fromServer: 1 } }
    )
  }, error)

  onStop(() => {
    console.log(`${connection.id} has said bye-bye`)
    subscription.dispose()
  })

  ready()
})
