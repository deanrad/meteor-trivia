import Rx from 'rx'
import store from '../../store/store'

let state$ = new Rx.Subject

store.subscribe(() => {
  let state = store.getState()
  console.log(state.toJS())
  state$.onNext(state)
})

export default state$.asObservable()
