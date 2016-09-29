/* eslint-disable */

import Rx from 'rx'
import { expect } from 'chai'

describe('Rx', function () {
  describe('observeOn', function () {
    it('should run subscription side effects immediately by default', function () {
      let subject = Rx.Observable.return(42)
      let callCount = 0
      subject.subscribe(x => { callCount += 1 })
      expect(callCount).to.equal(1)
    })

    it('should schedule side effects later with Rx.Scheduler.async', function (done) {
      let subject = Rx.Observable.return(42).observeOn(Rx.Scheduler.async)
      let callCount = 0
      subject.subscribe(x => { callCount += 1 })
      expect(callCount).to.equal(0)
      setTimeout(() => {
        expect(callCount).to.equal(1)
        done()
      }, 30 /* to be guaranteed later + prevent Heisenbug */)
    })

    it('should invoke all observers in the same stack frame by default', function (done) {
      let subject = Rx.Observable.from([41, 42])
      let callCount = 0
      subject.subscribe(x => {
        if (callCount == 0) {
          // because we're observing immediately by default, both callCount increments should happen before the
          // immediately next frame
          setImmediate(() => {
            expect(callCount).to.equal(2)
            done()
          })
        }
        callCount += 1
      })
    })

    it('should invoke observers separated by a frame with Rx.Scheduler.async', function (done) {
      let subject = Rx.Observable.from([41, 42]).observeOn(Rx.Scheduler.async)
      let callCount = 0
      subject.subscribe(x => {
        if (callCount == 0) {
          // because we're observing immediately by default, both callCount increments should happen before the
          // immediately next frame
          setImmediate(() => {
            expect(callCount).to.equal(1)
          })
        }
        callCount += 1
      })

      // Rx.Scheduler.async uses a faster implementation than setTimeout 0
      setTimeout(() => {
        expect(callCount).to.equal(2)
        done()
      }, 20)
    })
  })

  describe('subscribeOn - with immediately available value(s)', function () {
    it('should invoke the subscribed function immediately by default', function () {
      let subject = Rx.Observable.return(42)
      let callCount = 0
      subject.subscribe(x => { callCount += 1 })
      expect(callCount).to.equal(1)
    })

    it('should invoke the subscribed function later with Rx.Scheduler.async', function (done) {
      // subscribing on is when the first event will be emitted
      // even if all subsequent events are immediate, they are immediate only relative to each other
      let subject = Rx.Observable.return(42).subscribeOn(Rx.Scheduler.async)
      let callCount = 0
      subject.subscribe(x => { callCount += 1 })
      expect(callCount).to.equal(0)
      setTimeout(() => {
        expect(callCount).to.equal(1)
        done()
      }, 30 /* to be guaranteed later */)
    })
  })

  describe('pushing', function() {
    it('should invoke synchronous subscribers synchronously upon push', function() {
      let subject = new Rx.Subject()
      let callCount = 0
      subject.asObservable().subscribe(() => {callCount += 1})
      expect(callCount).to.equal(0)
      subject.onNext(3)
      expect(callCount).to.equal(1)
    })

    it('should propogate errors from synchronous subscribers errors', function() {
      let subject = new Rx.Subject(3)
      let callCount = 0
      subject.subscribe((val) => {if (val > 0) {throw new Error()} else callCount += 1})
      expect(() => {subject.onNext(3)}).to.throw()
      expect(() => {subject.onNext(-1)}).to.not.throw()
      expect(callCount).to.equal(1)
    })
  })
})
