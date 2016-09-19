import { Mongo } from 'meteor/mongo'
import store from '/imports/store/store'
import { createPublication } from './createPublication'
import clientUpdatesStream, { sanitizePayload } from '../streams/clientUpdatesStream'

// Note - Mergebox will not publish events that are dupes of previous ones, thus the
// inclusion of always-unique ObjectIDs on messages
Meteor.publish('serverActions', function() {
  var client = this

  console.log(`got subscriber ${client.connection.id}, sent state`,
    JSON.stringify(sanitizePayload(store.getState()).toJS()))

  client.added('serverActions', new Mongo.ObjectID(),
    {
      type: 'RESET',
      payload: sanitizePayload(store.getState()).toJS(),
      meta: { fromServer: 1 }
    })

  client.ready()
})
