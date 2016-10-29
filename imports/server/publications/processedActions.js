import { Meteor } from 'meteor/meteor'
import { Mongo } from 'meteor/mongo'
import store, { processedActions } from '../../store/store'

// Note - Mergebox will not publish events that are dupes of previous ones, thus the
// inclusion of always-unique ObjectIDs on messages
Meteor.publish('processedActions', function() {
  let client = this

  // Connection lifecycle
  console.log('  --------------  ')
  console.log(`PUB> got subscriber ${client.connection.id}, gave them RESET`)
  client.onStop(() => console.log(`PUB> ddp subscriber ${client.connection.id} signed off`))

  // Initial population
  client.added('processedActions', new Mongo.ObjectID(),
    {
      type: 'RESET',
      payload: store.getState().toJS(),
      meta: { fromServer: 1 }
    })
  client.ready()

  // Subscription to changes - try inserting delay(1000) for latency!
  processedActions
    .filter(action => (action.meta.origin === 'server') ||
                      (action.meta.connectionId !== client.connection.id))
    .subscribe(action => {
      console.log(`PUB> sending upstream: (${client.connection.id})`, action.type)
      try {
        // the RandomID is to ensure mergebox passes multiple identical actions
        client.added('processedActions', new Mongo.ObjectID(), action)
      } catch (ex) {
        console.log('Publish error:', ex)
      }
    })
})
