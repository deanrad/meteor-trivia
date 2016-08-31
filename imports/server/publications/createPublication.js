import { Meteor } from 'meteor/meteor'
import { thistle } from '@deanius/thistle'

export const createPublication = (name, fn) =>
  Meteor.publish(name, thistle(fn))
