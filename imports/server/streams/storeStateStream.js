import Rx from 'rx'
import store from '../../store/store'

let state$ = new Rx.Subject

store.subscribe(() => {
  state$.onNext(store.getState())
})

export default state$.asObservable()
