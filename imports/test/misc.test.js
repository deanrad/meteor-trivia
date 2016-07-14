import { Meteor } from 'meteor/meteor'
import { expect } from 'chai'

Meteor.atClient(() => {
  require('../client/main') // eslint-disable-line global-require

  describe('dispatchAction method', () => {
    it('should be defined on the window object', () => {
      expect(window.dispatchAction).to.be.a('function')
    })
    it('should have an optimistic handler to dispatch optimistic actions to the store directly')
  })
})

Meteor.atServer(() => {
  require('../server/main') // eslint-disable-line global-require

  describe('dispatchAction method', () => {
    it('should be available as a DDP method', () => {
      expect(Object.keys(Meteor.server.method_handlers)).to.include('dispatchAction')
    })
    it('should put objects received from this method onto incomingClientActions stream')
  })
})

Meteor.atServer(() => {
  describe('incomingClientActions', () => {
    it('contains actions which came from our clients')
  })
  describe('clientUpdatesStream', () => {
    it('contains the updates to push out to all clients')
  })
})

Meteor.atClient(() => {
  describe('serverActions subscription', () => {
    it('is subscribed to')
    it('has "added" events put on serverActionsStream')
  })
})
Meteor.atServer(() => {
  describe('serverActions publication', () => {
    it('is published')
    it('publishes events from clientUpdatesStream')
  })
})

Meteor.atClient(() => {
  describe('serverActionsStream', () => {
    it('has a listener for dispatching events to the store')
  })
})

