import store from '/imports/store/store'
import { Games } from '/imports/collections/collections'
import { Meteor } from 'meteor/meteor'
import { resetAction } from '/imports/store/reducers/reset'

import { initialStateTree } from '/imports/store/reducers/root'

Meteor.startup(() => {
  if (Games.find().count() === 0) {
    console.log('seeding initial game')
    Games.insert(initialStateTree.toJS())
  }

  let singletonGame = Games.findOne()
  delete singletonGame._id
  let payload = singletonGame
  console.log('resetting store to ', payload)
  store.dispatch(resetAction(payload))
})
