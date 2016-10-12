// runs via npm run test:meteor:unit
import { Meteor } from 'meteor/meteor'
import { expect } from 'chai'

Meteor.atClient(() => {
  require('../client/main') // eslint-disable-line global-require

  describe('dispatchAction method', () => {
    it('should be defined on the window object', () => {
      expect(window.dispatchAction).to.be.a('function')
    })
  })
})

Meteor.atServer(() => {
  require('../server/main') // eslint-disable-line global-require

  describe('dispatchAction method', () => {
    it('should be available as a DDP method', () => {
      expect(Object.keys(Meteor.server.method_handlers)).to.include('dispatchAction')
    })
    it('should put objects received from this method onto dispatchedActions stream')
  })
})

Meteor.atServer(() => {
  describe('dispatchedActions', () => {
    it('contains actions which came from our clients')
  })
  describe('clientUpdatesStream', () => {
    it('is derived from dispatchedActions')
    it('contains the updates to push out to all clients')
    it('filters correctAnswers from outgoing messages')
  })
})

Meteor.atClient(() => {
  describe('serverActions subscription', () => {
    it('is subscribed to')
    it('has "added" events put on serverActionsStream')
  })
})
Meteor.atServer(() => {
  describe('processedActions publication', () => {
    it('is published')
    it('publishes events from clientUpdatesStream')
    it('publishes the server state to newly connected clients')
  })
})

Meteor.atClient(() => {
  describe('serverActionsStream', () => {
    it('has a listener for dispatching events to the store')
  })
})

Meteor.atClient(() => {
  describe('serverActionsReceiver', () => {
    it('dispatches actions to the store')
  })
})

describe('The store', () => {
  it('is initialized, and will remain, an immutable Map')

  Meteor.atClient(() => {
    it('starts empty')
    it('accepts a RESET action')
  })
})

describe('Actions', () => {
  it('contain type, meta, and payload fields')
  describe('#payload', () => {
    it('contains a POJO (not immutable)')
  })
  Meteor.atClient(() => {
    describe('#meta', () => {
      it('can have optimistic:true to force dispatch on the client before server')
      it('has a store property with fields id, collection')
    })
  })
})
