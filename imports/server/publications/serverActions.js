import { Meteor } from 'meteor/meteor'
import { Mongo } from 'meteor/mongo'
import store from '../../store/store'
import consequencesOfActions from '../streams/consequencesOfActions'

const meteorize = Meteor.bindEnvironment

// Note - Mergebox will not publish events that are dupes of previous ones, thus the
// inclusion of always-unique ObjectIDs on messages
Meteor.publish('serverActions', function() {
  let client = this

  // Connection lifecycle
  console.log('  --------------  ')
  console.log(`PUB> got subscriber ${client.connection.id}, gave them RESET`)
  client.onStop(() => console.log(`PUB> ddp subscriber ${client.connection.id} signed off`))

  // Initial population
  client.added('serverActions', new Mongo.ObjectID(),
    {
      type: 'RESET',
      payload: store.getState(),
      meta: { fromServer: 1 }
    })
  client.ready()

  // Subscription to changes - try inserting delay(1000) for latency!
  consequencesOfActions.subscribe(meteorize(action => {
    console.log(`PUB> sending upstream: (${client.connection.id})`, action.type)
    client.added('serverActions', new Mongo.ObjectID(), action)
  }))
})
