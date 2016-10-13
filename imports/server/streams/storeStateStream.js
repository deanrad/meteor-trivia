import Rx from 'rx'
import store from '../../store/store'

let state$ = new Rx.Subject

store.subscribe(() => {
  let state = store.getState()
  console.log('S>', JSON.stringify(state.toJS(), null, 2))
  state$.onNext(state)
})

export default state$.asObservable()
