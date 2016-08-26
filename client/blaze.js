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
  rx.subscribe(next => rvar.set(next))
  return rvar
}

let reactiveObservable
Template.blaze.onCreated(() => {
  // var self = this
  reactiveObservable = rxToReactiveVar(observable)
})

Template.blaze.helpers({
  latestOfObservable: () => reactiveObservable.get()
})
