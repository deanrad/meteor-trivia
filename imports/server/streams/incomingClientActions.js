import Rx from 'rx'

let subject = new Rx.Subject()

export const pushNext = (action) => {
  subject.onNext(action)
}
export default subject.asObservable()
