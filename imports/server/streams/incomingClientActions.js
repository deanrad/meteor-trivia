import Rx from 'rx'

let subject = new Rx.Subject()

export const pushNext = subject.onNext.bind(subject)
export default subject.asObservable()
