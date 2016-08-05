/* eslint-disable */

import Rx from 'rx'
import { expect } from 'chai'

describe('Rx', function () {
  describe('observeOn', function () {
    it('should run subscription side effects immediately by default', function () {
      let subject = Rx.Observable.return(42)
      let callCount = 0
      let subscription = subject.subscribe(x => { callCount += 1 })
      expect(callCount).to.equal(1)
    })

    it('should schedule side effects later with Rx.Scheduler.async', function (done) {
      let subject = Rx.Observable.return(42).observeOn(Rx.Scheduler.async)
      let callCount = 0
      let subscription = subject.subscribe(x => { callCount += 1 })
      expect(callCount).to.equal(0)
      setTimeout(() => {
        expect(callCount).to.equal(1)
        done()
      }, 30 /* to be guaranteed later */)
    })
  })

  describe('subscribeOn - with immediately available value', function () {
    it('should invoke the subscribed function immediately by default', function () {
      let subject = Rx.Observable.return(42)
      let callCount = 0
      let subscription = subject.subscribe(x => { callCount += 1 })
      expect(callCount).to.equal(1)
    })

    it('should invoke the subscribed function later with Rx.Scheduler.async', function (done) {
      // subscribing on is when the first event will be emitted
      // even if all subsequent events are immediate, they are immediate only relative to each other
      let subject = Rx.Observable.return(42).subscribeOn(Rx.Scheduler.async).observeOn(Rx.Scheduler.immediate)
      let callCount = 0
      let subscription = subject.subscribe(x => { callCount += 1 })
      expect(callCount).to.equal(0)
      setTimeout(() => {
        expect(callCount).to.equal(1)
        done()
      }, 30 /* to be guaranteed later */)
    })
  })
})
