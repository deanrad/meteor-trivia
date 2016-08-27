import { ReactiveVar } from 'meteor/reactive-var'
import { Template } from 'meteor/templating'
import Rx from 'rx'
import './blaze.html'


const observable = Rx.Observable.create(observer => {
  observer.onNext(1)

  setTimeout(() => {
    observer.onNext(2)
  }, 1000)

  // observer.onNext(2)
  setTimeout(() => {
    observer.onNext(3)
    observer.onCompleted()
  }, 2000)

  // can be invoked as dispose()
  return () => {}
})


const rxToReactiveVar = (rx) => {
  let rvar = new ReactiveVar()
  // if 2 onNext occur in same event loop, only the final value is used
  // in the subsequent invalidations
  rx.subscribe(next => rvar.set(next))
  return rvar
}

Template.blaze.onCreated(function() {
  this.reactiveObservable = rxToReactiveVar(observable)
})

Template.blaze.helpers({
  latestOfObservable: () => Template.instance().reactiveObservable.get()
})
