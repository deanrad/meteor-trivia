import { Meteor } from 'meteor/meteor'
import { Mongo } from 'meteor/mongo'
import store from '/imports/store/store'
import incomingClientActions from '/imports/server/streams/incomingClientActions'

const meteorize = Meteor.bindEnvironment

// Note - Mergebox will not publish events that are dupes of previous ones, thus the
// inclusion of always-unique ObjectIDs on messages
Meteor.publish('serverActions', function() {
  let client = this

  console.log(`got subscriber ${client.connection.id}, sent state`,
    JSON.stringify(store.getState()))

  client.added('serverActions', new Mongo.ObjectID(),
    {
      type: 'RESET',
      payload: store.getState(),
      meta: { fromServer: 1 }
    })

  incomingClientActions.subscribe(meteorize(action => {
    console.log('sending upstream:', action)
    client.added('serverActions', new Mongo.ObjectID(), action)
  }))

  client.ready()
})
