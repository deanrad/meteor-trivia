import { expect } from 'chai'
import '/spec/specHelper'
import store from '/imports/store/store'
import { createReducer as reduxify } from 'redux-act'
import { createStore, combineReducers } from 'redux'

describe('Redux store', () => {
  let invocations
  let unsub
  let doDispatch = () => { store.dispatch({ type: 'RESET', payload: {} }) }

  before(() => {
    invocations = 0
    unsub = store.subscribe(() => { invocations += 1 })
  })

  describe('#subscribe', () => {
    it('effects of subscribers can be seen synchronously', () => {
      doDispatch()
      expect(invocations).to.equal(1)
    })

    it('returns an unsubscribe function', () => {
      doDispatch()
      expect(invocations).to.equal(2)

      unsub()

      doDispatch()
      expect(invocations).to.equal(2)
    })
  })

  describe('#combineReducers', () => {
    let fooCallCount = 0
    let barCallCount = 0

    let fooPlain = (old, item) => ((fooCallCount += 1) && item)
    let barPlain = (old, item) => ((barCallCount += 1) && item)

    let fooI = 'fooVal'
    let barI = 'barVal'

    let fooRedux = reduxify(fooPlain, fooI)
    let barRedux = reduxify(barPlain, barI)

    let iVal = {
      foo: fooI,
      bar: barI
    }

    it('Can be passed self-initializing reducers', () => {
      let store = createStore(
        combineReducers({
          foo: fooRedux,
          bar: barRedux
        })
      )
      expect(store.getState()).to.eql(iVal)
    })

    it('Will throw if passed reducers that return undefined, given null as first arg', () => {
      expect(() => {
        // eslint-disable-next-line no-unused-vars
        let store = createStore(
          combineReducers({
            foo: () => undefined,
            bar: () => undefined
          })
        )
      }).to.throw()
    })

    it('Or can be passed initialValue separately.', () => {
      let overridenInitalState = {
        foo: 'foo2',
        bar: 'bar2'
      }

      let store = createStore(
        combineReducers({
          foo: fooRedux,
          bar: barRedux
        }),
        overridenInitalState
      )

      expect(store.getState()).to.eql(overridenInitalState)
    })

    it('Unless you reduxify a reducer, you get the whole action, not just payload', () => {
      let store = createStore(fooPlain)
      expect(store.getState()).to.eql({ type: '@@redux/INIT' })
    })
  })
})
