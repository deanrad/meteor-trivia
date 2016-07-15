import { Meteor } from 'meteor/meteor'
import { Games } from '/imports/collections/collections'

window.Games = Games
Meteor.subscribe('gameUpdates')
