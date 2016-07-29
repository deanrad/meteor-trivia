import Rx from 'rx'
import { fromJS } from 'immutable'

let subject = new Rx.Subject()

export const pushNext = (action) => {
  subject.onNext(fromJS(action))
}
export default subject.asObservable()
