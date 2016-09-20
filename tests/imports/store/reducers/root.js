// import { expect } from 'chai'
// import '/tests/testHelper'
// import { Meteor } from 'meteor/meteor'
// import store from '/imports/store/store'

// describe('store state machine (server)', () => {
//   let state = store.getState()
//   describe('#INIT', () => {
//     before(() => {
//       // ensure were using the server version
//       expect([Meteor.isClient, Meteor.isServer]).to.eql([false, true])
//       // but, dispatch no actions
//     })

//     describe('game.status', () => {
//       it('"awaiting players"', () => {
//         expect(state).to.have.deep.property('game.status', 'awaiting players')
//       })
//     })
//     describe('round.question', () => {
//       it('null', () => {
//         expect(state).to.have.deep.property('round.question', null)
//       })
//     })
//   })

//   describe('#GAME_BEGIN', () => {
//     before(() => {
//       store.dispatch({ type: 'GAME_BEGIN' })
//       state = store.getState()
//     })

//     describe('game.status', () => {
//       it('"game on!"', () => {
//         expect(state).to.have.deep.property('game.status', 'game on!')
//       })
//     })
//   })

//   describe('#ROUND_BEGIN', () => {
//     before(() => {
//       store.dispatch({ type: 'ROUND_BEGIN' })
//       state = store.getState()
//     })

//     describe('round.question', () => {
//       it('looks like { prompt, choices, correctAnswer }', () => {
//         expect(state).to.have
//           .deep.property('round.question')
//           .that.has.all.keys(['prompt', 'choices', 'correctAnswer'])
//       })
//     })
//   })

//   describe('#ROUND_JUDGE', () => {
//     before(() => {
//       store.dispatch({ type: 'ROUND_JUDGE' })
//       state = store.getState()
//     })

//     describe('round.judged', () => {
//       it('true', () => {
//         expect(state).to.have
//           .deep.property('round.judged', true)
//       })
//     })
//   })

//   describe('#ADVANCE_QUESTION', () => {
//     let oldState
//     let oldQ
//     let newState

//     oldState = store.getState()
//     oldQ = oldState.getIn(['game', 'questions', 0]).toJS()
//     store.dispatch({ type: 'ADVANCE_QUESTION' })
//     newState = store.getState()

//     describe('round.question', () => {
//       it('should have the next question', () => {
//         expect(state.getIn(['round', 'question'])).to.eql(oldQ)
//       })
//     })

//     describe('game.questions', () => {
//       it('should have 1 fewer', () => {
//         let sizer = (state) => state.getIn(['game', 'questions']).size

//         expect(sizer(newState)).to.be.below(sizer(oldState))
//       })
//     })
//   })
// })
