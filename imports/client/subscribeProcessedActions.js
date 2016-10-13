import { Meteor } from 'meteor/meteor'
import serverActionsStream from './streams/serverActionsStream'

// eslint-disable-next-line no-unused-vars
let gameUpdates = Meteor.subscribe('processedActions')

// Treat the updates that come in over this subscription as
// actions to be dispatched to the store, and dispatch them
Meteor.connection._stream.on('message', (messageJSON) => {
  let message = JSON.parse(messageJSON)
  let action = message.fields

  if (message.collection === 'processedActions') {
    if (message.msg === 'added') {
      serverActionsStream.shamefullySendNext(action)
    }
  }
})
