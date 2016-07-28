import { expect } from 'chai'
import '/spec/specHelper'
import { Meteor } from 'meteor/meteor'
import store from '/imports/store/store'

describe('store state machine (server', () => {
  let state = store.getState()
  describe('#start', () => {
    before(() => {
      expect(Meteor.isClient).to.equal(false)
      // dispatch no actions
    })

    describe('game.status', () => {
      it('"awaiting players"', () => {
        expect(state).to.have.deep.property('game.status', 'awaiting players')
      })
    })
    describe('round.question', () => {
      it('null', () => {
        expect(state).to.have.deep.property('round.question', null)
      })
    })
  })

  describe('#game_begun', () => {
    before(() => {
      store.dispatch({ type: 'GAME_BEGIN' })
      state = store.getState()
    })

    describe('game.status', () => {
      it('"game on!"', () => {
        expect(state).to.have.deep.property('game.status', 'game on!')
      })
    })
    describe('round.question', () => {
      it('null', () => {
        expect(state).to.have
          .deep.property('round.question', null)
      })
    })
  })

  describe('#round_begun', () => {
    before(() => {
      store.dispatch({ type: 'ROUND_BEGIN' })
      state = store.getState()
    })

    describe('round.question', () => {
      it('looks like { prompt, choices, correctAnswer }', () => {
        expect(state).to.have
          .deep.property('round.question')
          .that.has.all.keys(['prompt', 'choices', 'correctAnswer'])
      })
    })
  })
})
