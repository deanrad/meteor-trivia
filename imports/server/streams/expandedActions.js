import Rx from 'rx'

// An Rx.Subject is like a ReactiveVar- it has a current value, but more importantly
// it returns an Observable of its updates when you call `subject.asObservable()`
let subject = new Rx.Subject()

export const pushNext = (action) => {
  // putting
  subject.onNext(action)
}

// Export the stream
export default subject.asObservable()
